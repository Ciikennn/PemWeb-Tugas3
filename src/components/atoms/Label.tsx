import type { LabelHTMLAttributes } from 'react'

export default function Label({ className = '', ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-semibold text-slate-800 ${className}`} {...props} />
}
