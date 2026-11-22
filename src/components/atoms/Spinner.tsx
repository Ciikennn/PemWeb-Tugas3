export default function Spinner({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-[3px] border-primary/25 border-t-primary ${className}`}
      aria-hidden="true"
    />
  )
}
