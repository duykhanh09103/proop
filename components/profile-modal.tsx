import { Dispatch, ReactNode, SetStateAction } from 'react'

type ProfileModalProps = {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  loading: boolean
  action: () => Promise<void>
  children: ReactNode
  title?: string
  actionTitle?: string
}

export default function ProfileModal({
  title = 'Create Profile',
  actionTitle = 'Create',
  openModal,
  setOpenModal,
  loading,
  action,
  children,
}: ProfileModalProps) {
  return (
    <>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className={`modal modal-bottom sm:modal-middle ${openModal ? 'modal-open' : ''}`}>
        <div className='modal-box relative'>
          <button className='btn btn-sm btn-circle absolute right-2 top-2' onClick={() => setOpenModal(false)}>
            ✕
          </button>
          <h3 className='text-lg font-bold select-none'>{title}</h3>
          <div className='form-control w-full gap-2'>{children}</div>
          <p className='py-4 text-neutral-content text-sm'>
            If you leave some fields empty, it&apos;s will use the default value
          </p>
          <div className='modal-action'>
            <button className='btn btn-ghost' onClick={() => setOpenModal(false)}>
              Not now
            </button>
            <button className={`btn btn-primary ${loading ? 'loading' : ''} `} disabled={loading} onClick={action}>
              {loading ? 'Signing Transaction' : actionTitle}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
