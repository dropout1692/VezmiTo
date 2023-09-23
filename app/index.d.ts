declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
}

declare module '*.css?inline' {
  const url: string
  export default url
}
