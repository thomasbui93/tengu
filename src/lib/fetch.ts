import got from 'got'
import { getKey, pageStorage } from './storage'

export const getPage = async (url: string): Promise<string> => {
  try {
    const cached = await getKey(pageStorage, url)
    if (cached) return cached;
    console.log('No local data - go to source:', url)
    const page = await got.get(url)
    await pageStorage.open()
    await pageStorage.put(url, page.body)

    return page.body
  } catch (err) {
    console.error('Failed to fetch the url: ', url, err)
  }
}
