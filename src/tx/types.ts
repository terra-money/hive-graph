import { TxInfo as ProtoTxInfo } from '@terra-money/terra.js'

// TODO: move me to a separate module
export interface PartSetHeader {
  total: number
  hash: string
}

export interface BlockId {
  hash: string
  part_set_header: PartSetHeader
}

export interface Version {
  block: string
  app: string
}

export interface PartSetHeader2 {
  total: number
  hash: string
}

export interface LastBlockId {
  hash: string
  part_set_header: PartSetHeader2
}

export interface Header {
  version: Version
  chain_id: string
  height: string
  time: string
  last_block_id: LastBlockId
  last_commit_hash: string
  data_hash: string
  validators_hash: string
  next_validators_hash: string
  consensus_hash: string
  app_hash: string
  last_results_hash: string
  evidence_hash: string
  proposer_address: string
}

export interface Data {
  txs: string[]
}

export interface Evidence {
  evidence: any[]
}

export interface PartSetHeader3 {
  total: number
  hash: string
}

export interface BlockId2 {
  hash: string
  part_set_header: PartSetHeader3
}

export interface Signature {
  block_id_flag: string
  validator_address: string
  timestamp: string
  signature: string
}

export interface LastCommit {
  height: string
  round: number
  block_id: BlockId2
  signatures: Signature[]
}

export interface Block {
  header: Header
  data: Data
  evidence: Evidence
  last_commit: LastCommit
}

export interface TendermintBlockResponse {
  block_id: BlockId
  block: Block
}

export interface Token {
  denom: string
  amount: string
}

export interface TimeoutHeight {
  revision_number: string
  revision_height: string
}

export interface Message {
  '@type': string
}

export interface Body {
  messages: Message[]
  memo: string
  timeout_height: string
  extension_options: any[]
  non_critical_extension_options: any[]
}

export interface PublicKey {
  '@type': string
  key: string
}

export interface Single {
  mode: string
}

export interface ModeInfo {
  single: Single
}

export interface SignerInfo {
  public_key: PublicKey
  mode_info: ModeInfo
  sequence: string
}

export interface Amount {
  denom: string
  amount: string
}

export interface Fee {
  amount: Amount[]
  gas_limit: string
  payer: string
  granter: string
}

export interface AuthInfo {
  signer_infos: SignerInfo[]
  fee: Fee
}

export interface Tx {
  body: Body
  auth_info: AuthInfo
  signatures: string[]
}

export interface Token2 {
  denom: string
  amount: string
}

export interface TimeoutHeight2 {
  revision_number: string
  revision_height: string
}

export interface Message2 {
  '@type': string
}

export interface Body2 {
  messages: any[]
  memo: string
  timeout_height: string
  extension_options: any[]
  non_critical_extension_options: any[]
}

export interface PublicKey2 {
  '@type': string
  key: string
}

export interface Single2 {
  mode: string
}

export interface ModeInfo2 {
  single: Single2
}

export interface SignerInfo2 {
  public_key: PublicKey2
  mode_info: ModeInfo2
  sequence: string
}

export interface Amount2 {
  denom: string
  amount: string
}

export interface Fee2 {
  amount: Amount2[]
  gas_limit: string
  payer: string
  granter: string
}

export interface AuthInfo2 {
  signer_infos: SignerInfo2[]
  fee: Fee2
}

export interface ProtoTx {
  '@type': string
  body: Body2
  auth_info: AuthInfo2
  signatures: string[]
}

export interface TxResponse {
  height: string
  txhash: string
  codespace: string
  code: number
  data: string
  raw_log: string
  logs: any[]
  info: string
  gas_wanted: string
  gas_used: string
  tx: ProtoTx
  timestamp: Date
}

export interface TendermintTxResponse {
  // tx: Tx
  tx_response: ProtoTxInfo.Data
}
