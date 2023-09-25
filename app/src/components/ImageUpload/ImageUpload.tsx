import { Icon } from '../Icon'

export const ImageUpload = ({
  previewSrc,
  onChange,
}: {
  previewSrc?: string
  onChange: (image: File) => void
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col rounded-lg border-4 border-dashed w-full min-h-40 p-10 group text-center">
        <div className="h-full w-full text-center flex flex-col items-center justify-center ">
          <div className="text-5xl text-primary p-4">
            {previewSrc ? (
              <img className="h-20 object-contain" src={previewSrc} />
            ) : (
              <Icon provider="phosphor" icon="tree" />
            )}
          </div>
          <p className="pointer-none text-gray-500 text-sm ">
            <span>Drag and drop</span> files here <br /> or select a file from
            your gallery
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files[0])}
          accept="image/*"
          capture
        />
      </label>
    </div>
  )
}
