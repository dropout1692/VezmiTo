import { createId, isCuid, init } from '@paralleldrive/cuid2'

export function randomString(length = 8, fingerprint?: string) {
  if (length) {
    return init({
      length,
      fingerprint: fingerprint || undefined,
    })()
  }
  return createId()
}

export function isValidCuid(id: string) {
  return isCuid(id)
}

export function dbId() {
  return createId()
}

export const randomStringFactory = init
