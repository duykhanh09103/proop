'use client'

import React, { useEffect, useState } from 'react'
import WalletAdapter from './wallet-adapter'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function ConnectWallet() {
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <>
      {domLoaded && (
        <WalletAdapter>
          <WalletMultiButton />
        </WalletAdapter>
      )}
    </>
  )
}
