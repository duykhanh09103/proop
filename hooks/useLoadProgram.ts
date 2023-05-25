import { IDL, Profai } from '@/configs/profai'
import * as anchor from '@project-serum/anchor'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'

export default function useLoadProgram(connection: anchor.web3.Connection, id: string) {
  const wallet = useAnchorWallet()
  const programID = useMemo(() => new PublicKey(id), [id])

  const program = useMemo(() => {
    if (wallet) {
      const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions())
      return new anchor.Program<Profai>(IDL, programID, provider)
    }
  }, [programID, wallet, connection])

  return {
    programID,
    program,
  }
}
