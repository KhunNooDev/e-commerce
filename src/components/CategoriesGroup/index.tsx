'use client'

import Container from '../Container'
import { BiGift } from 'react-icons/bi'
import CategoryBox from './CategoryBox'

export const categories = [
  {
    label: 'category 1',
    icon: BiGift,
    description: '',
  },
  {
    label: 'category 2',
    icon: BiGift,
    description: '',
  },
  {
    label: 'category 3',
    icon: BiGift,
    description: '',
  },
  {
    label: 'category 5',
    icon: BiGift,
    description: '',
  },
  {
    label: 'category 6',
    icon: BiGift,
    description: '',
  },
]
export default function Categories() {
  return (
    <Container>
      <div className='flex flex-row items-center justify-between overflow-x-auto pt-4'>
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} description={item.description} selected />
        ))}
      </div>
    </Container>
  )
}
