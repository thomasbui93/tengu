import { pageStorage, poemStorage } from '../../lib/storage'
import { BASE_POEM_URL } from './constants'

export const verifyPoemEntries = async () => {
  let validRecords = 0
  for await (const [key, value] of poemStorage.iterator()) {
    if (value !== '') {
      const entry = JSON.parse(value)
      if (entry.body.length > 0 && entry.title !== '') {
        validRecords ++
      } else {
        console.log('Cleaning the corrupted data ....')
        await pageStorage.del(`${BASE_POEM_URL}/${key}`)
        await poemStorage.del(key)
      }
    } else {
      console.log(`Invalid record at key ${key} with value: `, value)
    }
  }

  console.log('Total valid records: ', validRecords)
}
