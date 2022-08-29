import { poemStorage } from '../../lib/storage';
import { mongoDatabase } from '../../lib/mongo'
import { PoemEntry, PoemRecord } from './PoemEntry';
import { extractAuthorFromKey } from './author';

export const localToRemoteSync = async () => {
  const db = mongoDatabase()
  const poems = db.collection<PoemRecord>('poems')
  poems.createIndex({key: 1}, {unique: true})

  for await (const [key, value] of poemStorage.iterator()) {
    if (value !== '') {
      const entry: PoemEntry = JSON.parse(value) as PoemEntry
      await poems.insertOne({
        ...entry,
        author: extractAuthorFromKey(key),
        key
      })
    } else {
      console.log(`Invalid record at key ${key} with value: `, value)
    }
  }
}
