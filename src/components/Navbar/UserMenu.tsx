'use client'
import { HiOutlineMenu } from 'react-icons/hi'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          onClick={toggleOpen}
        >
          your
        </div>
        <div
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={() => {}}
        >
          <HiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md ring-0 md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            <MenuItem onClick={() => {}} label='Login' />
            <MenuItem onClick={() => {}} label='Sign up' />
          </div>
        </div>
      )}
    </div>
  )
}
