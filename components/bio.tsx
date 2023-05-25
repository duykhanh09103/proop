'use client'

import { formatWallet } from '@/helpers/format-wallet'
import useCopyToClipboard from '@/hooks/useCopyToClipboard'
import { Gradient } from '@/lib/gradient'
import { Profile } from '@/types/profile'
import { PublicKey } from '@solana/web3.js'
import Avatar from 'boring-avatars'
import { Copy, Edit2, Focus, LogOut, UserPlus2 } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useState } from 'react'

type BioProps = {
  profile: Profile
  profilePDA: PublicKey
  children?: ReactNode
  isProfileExist: boolean
  isGuest: boolean
  disconnect?: () => Promise<void>
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function Bio({
  isGuest,
  profile,
  profilePDA,
  children,
  isProfileExist,
  disconnect,
  setOpenModal,
}: BioProps) {
  const [state, copyToClipboard] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    state.value && setCopied(true)
  }, [state])

  useLayoutEffect(() => {
    const gradient = new Gradient()

    // @ts-ignore
    gradient.initGradient('#gradient-canvas')
  }, [])

  return (
    <>
      <div className='absolute w-full h-[200px] bg-red-200 rounded-b-xl overflow-hidden'>
        <canvas id='gradient-canvas' data-transition-in />
      </div>
      <div className='w-full mt-36 flex items-center flex-col gap-3'>
        <div className='avatar'>
          <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <Avatar
              size={'100%'}
              name={profile.author.toString()}
              variant='beam'
              colors={['#c3e4ff', '#6ec3f4', '#eae2ff', '#C271B4', '#b9beff']}
            />
          </div>
        </div>

        <div className='flex w-full gap-1 flex-col items-center'>
          <span className=' font-semibold text-2xl select-none'>{profile.name}</span>
          <div className='flex gap-2 items-center'>
            <span className=' text-neutral-content select-none'>{formatWallet(profile.author.toString(), 6)}</span>
            <div className='tooltip' data-tip={copied ? 'Copied' : 'Copy'}>
              <button
                onMouseOut={() => setCopied(false)}
                className='btn btn-square btn-xs'
                onClick={() => copyToClipboard(profile.author.toString())}>
                <Copy size={12} />
              </button>
            </div>
          </div>
        </div>
        <div className='flex gap-2'>
          {!isGuest && (
            <button className='btn btn-sm gap-2 mt-2' onClick={() => setOpenModal(true)}>
              {isProfileExist ? (
                <>
                  <Edit2 size={16} /> Edit profile
                </>
              ) : (
                <>
                  <UserPlus2 size={16} /> Create profile
                </>
              )}
            </button>
          )}

          <div className='tooltip' data-tip='View on Explorer'>
            <Link
              target='_blank'
              href={`https://explorer.solana.com/address/${profilePDA.toString()}?cluster=devnet`}
              className='btn btn-square btn-sm gap-2 mt-2'>
              <Focus size={16} />
            </Link>
          </div>
          {disconnect && (
            <div className='tooltip' data-tip='Disconnect'>
              <button className='btn btn-square btn-sm gap-2 mt-2 bg-neutral-focus' onClick={disconnect}>
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='w-[80%] mt-10 pb-10'>
        <ul className='form-control w-full gap-2'>{children}</ul>
      </div>
    </>
  )
}
