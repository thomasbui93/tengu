import { load } from 'cheerio';
import { AlgorithmTerm } from './AlgorithmTerm';
import ExtractedContent from './ExtractedContent';
import { WebPage } from './WebPage';


export class DefinitionPage extends WebPage implements ExtractedContent<AlgorithmTerm> {
  public async extract(): Promise<AlgorithmTerm> {
    const pageContent = await this.content();
    const $ = load(pageContent);

    const definition = $('h1 + p + p').text();
    const name = $('h1').text();

    return {
      definition,
      type: this.metadata.get('type'),
      name,
      url: this.url, 
    }
  }
}
