import clsx from 'clsx'

export function Button({
  children,
  className,
  onClick,
}: {
  children: any
  className?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      role="button"
      className={clsx('p-2 rounded', className)}
    >
      {children}
    </button>
  )
}
