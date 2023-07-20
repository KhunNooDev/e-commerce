'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from '.'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'

export default function LoginModal() {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }
      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' center />
      <Input id='email' label='Email' disable={isLoading} register={register} errors={errors} required />
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
          <div className='cursor-pointer text-neutral-500 hover:underline' onClick={loginModal.onClose}>
            Log in
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      title='Login'
      actionLabel='Continue'
      body={bodyContent}
      footer={footerContent}
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.onClose}
      isOpen={loginModal.isOpen}
      disabled={isLoading}
    />
  )
}