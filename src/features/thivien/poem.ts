import { getPage } from '../../lib/fetch'
import { load } from 'cheerio'
import { PoemEntry, PoemContent } from './PoemEntry'

export const getPoemFromUrl = async (url: string): Promise<PoemEntry> => {
  const pageContent = await getPage(url)
  const $ = load(pageContent)

  const titles = $('.poem-view-separated h4').map(function() { return $(this).text() }).toArray().map(el => el.toString())
  const translations: string[] = $('.poem-view-separated p').map(function() { return $(this).find('br').replaceWith('\n').end().text() })
    .toArray()
    .map(el => el.toString())
    .filter(el => el.trim() !== '')

  const mainTitle = $('.page-header h1').text()
  const entries: PoemContent[] = new Array(titles.length);
  titles.forEach((title, index) => entries[index] = {
    title,
    content: translations[index]
  })

  return {
    title: mainTitle,
    body: entries
  }
}
