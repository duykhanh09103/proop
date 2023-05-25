import Profile from '@/components/profile'
import { isValidWallet } from '@/helpers/isValidWallet'
import { Metadata } from 'next'

type Props = {
  params: { wallet: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const wallet = params.wallet

  return {
    title: `Proop | ${wallet}`,
  }
}

export default function Page({ params }: Props) {
  return (
    <main className='w-full h-screen bg-base-100'>
      {isValidWallet(params.wallet) ? <Profile isGuest wallet={params.wallet} /> : <span>Invalid wallet</span>}
    </main>
  )
}
