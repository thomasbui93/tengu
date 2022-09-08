import { getKey, poemStorage } from '../../lib/storage'
import { waitInSeconds } from '../../lib/wait'
import EventEmitter from 'events'
import { getAuthorLinks, getPoemPageUrls } from './author'
import { BASE_POEM_URL, SEED_CHINESE_AUTHORS_URL } from './constants'
import { getPoemFromUrl } from './poem'
import { syncRecord } from './localToRemoteSync'

const eventEmitter = new EventEmitter()

const events = {
  poemSave: 'poem:save',
  seedAuthor: 'poem:seed:author',
  syncToRemote: 'poem:remote:sync'
}

const savePoem = async (url: string) => {
  const poem = await getPoemFromUrl(`${BASE_POEM_URL}/${url}`)
  await poemStorage.put(url, JSON.stringify(poem))

  console.log('Poem is fetched and saved from url: ', url)
  eventEmitter.emit(events.syncToRemote, url)
}

const seedAuthor = async (url: string) => {
  const links = await getPoemPageUrls(`${BASE_POEM_URL}/${url}`)
  console.log(`There are ${links.length} poems total to crawl for ${url}.`)
  for (let i = 0; i < links.length; i ++) {
    const cache = await getKey(poemStorage, links[i])
    console.log(`About to seed a poem link: ${links[i]}. Completing: ${i} in ${links.length}.`)
    if (cache) {
      continue
    }
    await waitInSeconds(60)
    eventEmitter.emit(events.poemSave, links[i])
  }
}

const seedAuthors = async (url: string) => {
  const authorLinks = await getAuthorLinks(url)
  for (let i = 0; i < authorLinks.length; i ++) {
    console.log('About to seed an author link: ', authorLinks[i])
    await waitInSeconds(50)
    eventEmitter.emit(events.seedAuthor, authorLinks[i])
  }
}

export const syncPoem = async () => {
  eventEmitter.on(events.seedAuthor, seedAuthor)
  eventEmitter.on(events.poemSave, savePoem)
  eventEmitter.on(events.syncToRemote, syncRecord)

  seedAuthors(SEED_CHINESE_AUTHORS_URL)
}
