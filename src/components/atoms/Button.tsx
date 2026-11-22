import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'

export type ButtonVariant = 'primary' | 'outline' | 'danger' | 'outline-danger' | 'ghost'
export type ButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md border-[1.5px] font-semibold transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-primary text-white hover:bg-primary-hover',
  outline: 'border-primary bg-white text-primary hover:bg-primary-soft',
  danger: 'border-transparent bg-danger text-white hover:bg-danger-hover',
  'outline-danger': 'border-danger bg-white text-danger hover:bg-danger-soft',
  ghost: 'border-transparent bg-transparent text-slate-500 hover:text-slate-900',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
}

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim()
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export default function Button({ variant, size, className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />
}

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Link (React Router) dengan tampilan tombol. */
export function ButtonLink({ variant, size, className = '', ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />
}
