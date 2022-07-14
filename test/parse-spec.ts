/* eslint @typescript-eslint/no-var-requires: "off" */
export const parseSpecData = (file: string) => {
  const json = require(file)
  const chain = process.env['CHAIN_ID']

  if (chain) {
    return json[chain]
  }
}
