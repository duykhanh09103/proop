import { PublicKey } from '@solana/web3.js'

export type Profile = {
  author: PublicKey
  name: string
  facebook: string
}
