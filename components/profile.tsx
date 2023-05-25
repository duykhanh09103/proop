'use client'

import { PROFILE_TAG, PROGRAM_ID } from '@/configs/program'
import useLoadProgram from '@/hooks/useLoadProgram'
import { Profile } from '@/types/profile'
import * as anchor from '@project-serum/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useMemo, useState } from 'react'
import Bio from './bio'
import ProfileModal from './profile-modal'
import { Social } from './social'
import SocialInput from './social-input'

type ProfileProps = {
  wallet: string
  isGuest: boolean
}

export default function Profile({ isGuest, wallet }: ProfileProps) {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const publicKey = useMemo(() => new PublicKey(wallet), [wallet])

  const [isProfileExist, setIsProfileExist] = useState(false)
  const [profile, setProfile] = useState<Profile | undefined>()
  const [name, setName] = useState('rand0mName')
  const [facebook, setFacebook] = useState('https://www.facebook.com')

  const { connection } = useConnection()
  const { program: profaiProgram, programID } = useLoadProgram(connection, PROGRAM_ID)
  const { disconnect } = useWallet()
  const [profilePDA] = useMemo(
    () =>
      anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode(PROFILE_TAG), publicKey.toBuffer()],
        programID,
      ),
    [publicKey, programID],
  )

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profaiProgram, publicKey, wallet])

  const getProfile = async () => {
    // if (!anchorWallet) setVisible(true)
    if (!profaiProgram || !publicKey) return

    try {
      const profile = await profaiProgram.account.profile.all([
        {
          memcmp: {
            offset: anchor.ACCOUNT_DISCRIMINATOR_SIZE,
            bytes: publicKey.toBase58(),
          },
        },
      ])

      if (profile.length > 0) {
        setIsProfileExist(true)
        setProfile(profile[0].account)
        setName(profile[0].account.name)
        setFacebook(profile[0].account.facebook)
      } else {
        setIsProfileExist(false)
        setProfile({
          author: publicKey,
          name: 'Your name goes here',
          facebook: 'https://www.facebook.com/',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createProfile = async () => {
    if (!profaiProgram || !publicKey) return

    try {
      setLoading(true)

      const tx = await profaiProgram.methods
        .init(name, facebook)
        .accounts({
          profile: profilePDA,
          systemProgram: anchor.web3.SystemProgram.programId,
          signer: publicKey,
        })
        .rpc()

      setOpenModal(false)
      await getProfile()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    if (!profaiProgram || !publicKey) return
    try {
      setLoading(true)
      console.log(profaiProgram, publicKey)

      const tx = await profaiProgram.methods
        .update(name, facebook)
        .accounts({
          profile: profilePDA,
          systemProgram: anchor.web3.SystemProgram.programId,
          signer: publicKey,
        })
        .rpc()

      setOpenModal(false)
      await getProfile()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex w-full justify-center min-h-screen'>
      <div className='relative w-[500px] bg-base-300 flex flex-col items-center'>
        {profile && (
          <Bio
            isGuest={isGuest}
            isProfileExist={isProfileExist}
            profile={profile}
            disconnect={disconnect}
            profilePDA={profilePDA}
            setOpenModal={setOpenModal}>
            <Social name='Facebook' url={profile.facebook} />
          </Bio>
        )}
      </div>

      <ProfileModal
        loading={loading}
        openModal={openModal}
        title={isProfileExist ? 'Edit Profile' : 'Create Profile'}
        actionTitle={isProfileExist ? 'Update' : 'Create'}
        setOpenModal={() => setOpenModal(false)}
        action={isProfileExist ? updateProfile : createProfile}>
        <SocialInput name='Name' placeholder={name || 's0nhaaa'} onChange={(e) => setName(e.target.value)} />
        <SocialInput
          onChange={(e) => setFacebook(e.target.value)}
          name='Facebook'
          placeholder={facebook || 'https://www.facebook.com/s0nhaaa/'}
        />
      </ProfileModal>
    </section>
  )
}
