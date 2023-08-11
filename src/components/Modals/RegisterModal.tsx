'use client'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from '.'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
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
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome' subtitle='Create an account!' center />
      <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
      <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='mt-3 flex flex-col gap-4'>
      <hr />
      {/* <Button label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')} outline /> */}
      <Button label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')} outline />
      <div className='mt-4 text-center font-light text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <p>Already have an account?</p>
          <span className='cursor-pointer text-neutral-800 hover:underline' onClick={onToggle}>
            Log in
          </span>
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
