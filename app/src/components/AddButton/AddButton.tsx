import { Icon } from '../Icon/Icon'

export const AddButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      // className="hidden mobile-only:!block absolute rounded-full text-4xl right-[2rem] top-[2rem] text-white bg-primary p-[0.5rem] z-[1000]"
      className="absolute rounded-full text-4xl right-[2rem] top-[2rem] text-white bg-primary p-[0.5rem] z-[1000]"
    >
      <Icon provider="phosphor" icon="plus" />
    </button>
  )
}
