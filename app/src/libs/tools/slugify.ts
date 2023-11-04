import npmSlugify from 'slugify'
npmSlugify.extend({ _: '-' })

type SlugifyOptions = Parameters<typeof npmSlugify>[1]

/** shared config between all scene apps */
const SHARED_CONFIG: SlugifyOptions = {
  lower: true,
  strict: true,
}

export function slugify(text: string) {
  return npmSlugify(text, SHARED_CONFIG)
}
