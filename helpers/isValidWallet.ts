import { PublicKey } from '@solana/web3.js'

const isBase58 = (value: string): boolean => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value)

export const isValidWallet = (wallet: string) =>
  isBase58(wallet) && wallet.length === 44 && PublicKey.isOnCurve(new PublicKey(wallet))
