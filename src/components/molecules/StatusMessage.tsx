import type { ReactNode } from 'react'
import Spinner from '../atoms/Spinner'

interface StatusMessageProps {
  variant: 'loading' | 'error' | 'empty'
  message: string
  action?: ReactNode
}

const styles = {
  loading: 'text-slate-500',
  error: 'bg-danger-soft text-danger',
  empty: 'text-slate-500',
}

export default function StatusMessage({ variant, message, action }: StatusMessageProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`flex flex-col items-center gap-3 rounded-xl px-4 py-10 text-center ${styles[variant]}`}
    >
      {variant === 'loading' && <Spinner />}
      <p>{message}</p>
      {action}
    </div>
  )
}
