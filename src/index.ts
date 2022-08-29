import { verifyPoemEntries } from './features/thivien/verification';
import { syncPoem } from './features/thivien/run';
import { localToRemoteSync } from './features/thivien/localToRemoteSync';

const run = async () => {
  await verifyPoemEntries();
  await localToRemoteSync()
}

run()
