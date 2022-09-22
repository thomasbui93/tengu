import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'


export const mongoDatabase = () => {
  dotenv.config()
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);
  return client.db(process.env.MONGO_DATABASE)
}
