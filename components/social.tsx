'use client'

import { Variants, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { ComponentProps, useState } from 'react'

type SocialProps = ComponentProps<'li'> & {
  name?: string
  url?: string
}

const variants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: -45,
  },
}

export function Social({ name = 'Profai', url = 'https://profai.vercel.app', ...props }: SocialProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <li className='input-group' {...props}>
      <input type='text' value={name} className='input input-bordered w-full' disabled />
      <Link
        className='btn btn-square'
        onMouseLeave={() => setIsHover(false)}
        onMouseEnter={() => setIsHover(true)}
        href={url}
        target='_blank'>
        <motion.div variants={variants} initial='initial' animate={isHover ? 'animate' : 'initial'}>
          <ArrowRight size={20} />
        </motion.div>
      </Link>
    </li>
  )
}
