import clsx from 'clsx'

export const Month = ({ name, active }: { name: string; active: boolean }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center text-md h-[30px]  text-md font-bold text-gray-700 border border-gray-300',
        {
          'bg-neutral-100': !active,
          'bg-primary text-white border-primary': active,
        },
      )}
    >
      {name}
    </div>
  )
}
