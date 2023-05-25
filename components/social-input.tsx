import React, { ComponentProps } from 'react'

type SocialProps = ComponentProps<'input'> & {
  name?: string
}

export default function SocialInput({ name = 'Profai', ...props }: SocialProps) {
  return (
    <div>
      <label className='label'>
        <span className='label-text'>{name}</span>
      </label>
      <input type='text' className='input input-bordered w-full select-none' {...props} />
    </div>
  )
}
