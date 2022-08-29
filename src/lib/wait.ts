export const waitInSeconds = async (timeoutInSecond: number) => await new Promise(resolve => setTimeout(() => {
  console.log(`Waited for ${timeoutInSecond}s second`)
  resolve('')
}, timeoutInSecond * 1000));
