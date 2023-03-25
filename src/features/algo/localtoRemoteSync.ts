import { algoTermStorage } from '../../lib/storage';
import { mongoDatabase } from '../../lib/mongo'
import { AlgorithmTerm } from './AlgorithmTerm';

export const localToRemoteSync = async () => {
  const db = mongoDatabase()
  const algorithmTermsCollection = db.collection<AlgorithmTerm>('algorithm_terms');

  algorithmTermsCollection.createIndex({url: 1}, {unique: true});
  for await (const [key, value] of algoTermStorage.iterator()) {
    if (value !== '') {
      const term: AlgorithmTerm = JSON.parse(value) as AlgorithmTerm
      const existed = await algorithmTermsCollection.findOne({ url: key })
      if (existed || !term.url) continue
      console.log('Record is not created yet, creating...', term.definition)
      await algorithmTermsCollection.insertOne(term);
    } else {
      console.log(`Invalid record at key ${key} with value: `, value)
    }
  }
}
