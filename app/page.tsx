'use client'

import Profile from '@/components/profile'
import WalletAdapter from '@/components/wallet-adapter'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  const { publicKey, disconnect } = useWallet()
  const { setVisible } = useWalletModal()

  return (
    <>
      {domLoaded && (
        <main className='w-full h-screen bg-base-100'>
          <WalletAdapter>
            {publicKey ? (
              <Profile isGuest={false} wallet={publicKey.toString()} disconnect={disconnect} />
            ) : (
              <div className='flex items-center justify-center h-full'>
                <button className='btn btn-primary' onClick={() => setVisible(true)}>
                  Connect Wallet
                </button>
              </div>
            )}
          </WalletAdapter>
        </main>
      )}
    </>
  )
}
