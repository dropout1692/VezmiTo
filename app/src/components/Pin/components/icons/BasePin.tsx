export function BasePin(props) {
  return (
    //its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...

    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M208,104c0,72-80,128-80,128s-80-56-80-128c0-44.2,35.8-80,80-80S208,59.8,208,104z" />
    </svg>
  )
}
