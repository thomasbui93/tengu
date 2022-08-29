export type PoemEntry = {
  title: string,
  body: PoemContent[]
}

export type PoemContent = {
  title: string,
  content: string
}

export type PoemRecord = {
  title: string,
  body: PoemContent[],
  key: string,
  author: string
}
