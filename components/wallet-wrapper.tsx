'use client'

import Profile from '@/components/profile'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

export default function WalletWrapper() {
  const { publicKey } = useWallet()
  const { setVisible } = useWalletModal()

  return (
    <>
      {publicKey ? (
        <Profile isGuest={false} wallet={publicKey.toString()} />
      ) : (
        <div className='flex items-center justify-center h-full'>
          <button className='btn btn-primary' onClick={() => setVisible(true)}>
            Connect Wallet
          </button>
        </div>
      )}
    </>
  )
}
