import type { InputHTMLAttributes } from 'react'
import Input from '../atoms/Input'
import Label from '../atoms/Label'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  hint?: string
  error?: string
}

export default function FormField({ id, label, hint, error, ...inputProps }: FormFieldProps) {
  const message = error ?? hint
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} invalid={Boolean(error)} aria-describedby={message ? `${id}-msg` : undefined} {...inputProps} />
      {message && (
        <small id={`${id}-msg`} className={`text-xs ${error ? 'text-danger' : 'text-slate-500'}`}>
          {message}
        </small>
      )}
    </div>
  )
}
