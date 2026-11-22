import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export default function Input({ invalid = false, className = '', ...props }: InputProps) {
  return (
    <input
      className={
        'w-full rounded-md border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 ' +
        'outline-none transition focus:ring-4 ' +
        (invalid
          ? 'border-danger focus:ring-danger/20 '
          : 'border-slate-300 focus:border-primary focus:ring-primary/15 ') +
        className
      }
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
