'use client'
import { useCallback, useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/types'

interface UserMenuProps {
  currentUser?: SafeUser | null
}
export default function UserMenu({ currentUser }: UserMenuProps) {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          onClick={() => {}}
        >
          your
        </div>
        <div
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={toggleOpen}
        >
          <HiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md ring-0 md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            {currentUser ? (
              <>
                <MenuItem label='Other' onClick={() => {}} />
                <hr />
                <MenuItem label='Logout' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label='Login' onClick={loginModal.onOpen} />
                <MenuItem label='Register' onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
