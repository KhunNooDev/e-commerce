// 'use client'
interface MenuItemProps {
  onClick: () => void
  label: string
}

export default function MenuItem({ onClick, label }: MenuItemProps) {
  return (
    <div className='px-4 py-3 font-semibold hover:bg-neutral-100' onClick={onClick}>
      {label}
    </div>
  )
}
