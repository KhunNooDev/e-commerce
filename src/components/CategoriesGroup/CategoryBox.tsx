'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  label: string
  icon: IconType
  description: string
  selected?: boolean
}
export default function CategoryBox({ label, icon: Icon, description, selected }: CategoryBoxProps) {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    router
    label
    debugger
  }, [])
  return (
    <div
      className={`flex cursor-pointer select-none flex-col items-center
        justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800
        ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}`}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}
