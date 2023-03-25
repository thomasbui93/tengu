import { load } from 'cheerio'
import { BASE_URL } from './constant';
import ExtractedContent from './ExtractedContent';
import { WebPage } from './WebPage';

export type AlgorithmSection = {
  section: string,
  links: AlgorithmLink[]
}

export type AlgorithmLink = {
  link: string,
  title: string
}

export class StartPage extends WebPage implements ExtractedContent<AlgorithmSection[]> {
  public async extract(): Promise<AlgorithmSection[]> {
    const pageContent = await this.content();
    const $ = load(pageContent);

    const sections: string[] = $('h2')
      .map(function() { return $(this).text() })
      .toArray()
      .map(el => el.toString());
    
    const links: AlgorithmLink[][] = $('h2 + ul')
      .toArray()
      .map((el) => {
        const result = $(el)
        .find('a')
        .toArray()
        .map(function(link) {
          return {
            link: BASE_URL + $(link).attr('href'),
            title: $(link).text(),
          }
        });
        return result;
      });

    return sections.map((section, index) => ({
      section,
      links: links[index]
    }))
  }
}
