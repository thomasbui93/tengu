import { algoTermStorage } from '../../lib/storage'
import { waitInSeconds } from '../../lib/wait'
import { START_URL } from './constant'
import { DefinitionPage } from './DefinitionPage'
import { localToRemoteSync } from './localtoRemoteSync'
import { AlgorithmLink, AlgorithmSection, StartPage } from './StartPage'

const kickoff = async () => {
  try {
    const startPage = new StartPage(START_URL);
    const nextStages: AlgorithmSection[] = await startPage.extract();

    nextStages.forEach(async ({links, section}) => {
      console.log('Start download section: ', section)
      console.log('Links in sections:', links.length)

      while(links.length > 0) {
        const algoLink = links.pop();
        await waitInSeconds(1)
        await fetchTerm(algoLink, section)
      }
    });
  } catch (err) {
    console.log('Error while kicking off fetching algo terms');
  }
}

const fetchTerm = async ({link, title}: AlgorithmLink, section: string) => {
  try {
    console.log('Start to download a specific link: ', link, title)
    const metadata = new Map([['type', section]]);
    const definitionPage = new DefinitionPage(link, metadata)
    const algoTerm = await definitionPage.extract();
    await waitInSeconds(1)

    await algoTermStorage.put(link, JSON.stringify(algoTerm))
  } catch (err) {
    console.log('Error while fetching algo term: ', link, title);
  }
};

export const syncAlgo = async () => {  
  // await kickoff();
  await localToRemoteSync();
}
