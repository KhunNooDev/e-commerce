'use client'
import { useCallback, useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi'
import Button from '../Button'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

export default function index({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return
    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return
    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) return null
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none'>
        <div className='lg-3/6 xl:2/5 relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto'>
          {/* CONTENT */}
          <div
            className={`translate h-full duration-300 ${
              showModal ? 'translate-y-0 opacity-100 ' : 'translate-y-full opacity-0'
            }`}
          >
            <div className='translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto'>
              {/* HEADER */}
              <div className='relative flex items-center justify-center rounded-t border-b p-6'>
                <button className='absolute left-9 border-0 p-1 transition hover:opacity-70' onClick={handleClose}>
                  <HiX size={18} />
                </button>
                <div className='text-lg font-semibold'>{title}</div>
              </div>
              {/* BODY */}
              <div className='relative flex-auto p-6'>{body}</div>
              {/* FOOTER */}
              <div className='flex flex-col gap-2 p-6'>
                <div className='flex w-full flex-row items-center gap-4'>
                  {secondaryAction && secondaryActionLabel && (
                    <Button label={secondaryActionLabel} onClick={handleSecondaryAction} outline disabled={disabled} />
                  )}
                  <Button label={actionLabel} onClick={handleSubmit} disabled={disabled} />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
