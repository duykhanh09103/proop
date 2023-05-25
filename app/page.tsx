import WalletAdapter from '@/components/wallet-adapter'
import WalletWrapper from '@/components/wallet-wrapper'

export default function Home() {
  return (
    <main className='w-full h-screen bg-base-100'>
      <WalletAdapter>
        <WalletWrapper />
      </WalletAdapter>
    </main>
  )
}
