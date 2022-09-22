import { getPage } from '../../lib/fetch'
import { load } from 'cheerio'

export const getAuthorLinks = async (url: string): Promise<string[]> => {
  const pageContent = await getPage(url)
  const $ = load(pageContent)

  const urls = $('.list-item-header a').map(function() { return $(this).attr('href') })
  return urls.toArray().map(el => el.toString())
}

export const getPoemPageUrls = async (url: string) => {
  const pageContent = await getPage(url);
  const $ = load(pageContent)

  const urls = $('.poem-group-list a').map(function() { return $(this).attr('href')})
  return urls.toArray()
    .map(el => el.toString())
    .filter(link => link.indexOf('/poem-') > -1)
}

export const extractAuthorFromKey = (key: string) => decodeURI(key)
  .split('/')[1]
  .split('-')
  .join(' ')
