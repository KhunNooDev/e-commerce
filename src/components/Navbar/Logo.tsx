'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter()
  return <Image alt='Logo' className='hidden cursor-pointer md:block' height='50' width='50' src='/images/logo.png' />
}
