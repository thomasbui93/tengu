export default interface ExtractedContent<T> {
  extract: () => Promise<T>
}
