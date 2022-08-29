import { Level } from 'level'

export const pageStorage = new Level('./.db/pages', { valueEncoding: 'json' })

export const poemStorage = new Level('./.db/poems', { valueEncoding: 'json' })

export const getKey = async (storage: Level<string, string>, key: string) => {
  try {
    const content = await storage.get(key)
    return content
  } catch (err) {
    return false
  }
}
