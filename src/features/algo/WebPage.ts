import { getPage } from '../../lib/fetch'

export class WebPage {
  protected url: string;
  protected metadata: Map<string, string>;

  constructor(url: string, metadata: Map<string, string> = new Map()) {
    this.url = url;
    this.metadata = metadata;
  }

  public content(): Promise<string> {
    return getPage(this.url)
  }
}
