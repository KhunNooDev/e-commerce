// 'use client'
import { HiSearch } from 'react-icons/hi'

export default function Search() {
  return (
    <div className='w-full cursor-pointer rounded-sm border py-2 transition hover:shadow-md md:w-auto'>
      <div className='flex flex-row items-center justify-center'>
        <div className='px-6 text-sm font-semibold'>AnyWhere</div>
        <div className='hidden flex-1 border-x px-5 text-center text-sm font-semibold sm:block'>Any week</div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='hidden sm:block'>Add Guests</div>
          <div className='rounded-full bg-rose-500 p-2 text-white'>
            <HiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
