'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from '.'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { name: '', email: '', password: '' } })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((error) => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome' subtitle='Create an account!' center />
      <Input id='email' label='Email' disable={isLoading} register={register} errors={errors} required />
      <Input id='name' label='Name' disable={isLoading} register={register} errors={errors} required />
      <Input
        id='password'
        label='Password'
        type='password'
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='mt-3 flex flex-col gap-4'>
      <hr />
      <Button label='Continue with Google' icon={FcGoogle} onClick={() => {}} outline />
      <Button label='Continue with Github' icon={AiFillGithub} onClick={() => {}} outline />
      <div className='mt-4 text-center font-light text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div className='cursor-pointer text-neutral-500 hover:underline' onClick={registerModal.onClose}>
            Log in
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      title='Register'
      actionLabel='Continue'
      body={bodyContent}
      footer={footerContent}
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.onClose}
      isOpen={registerModal.isOpen}
      disabled={isLoading}
    />
  )
}
