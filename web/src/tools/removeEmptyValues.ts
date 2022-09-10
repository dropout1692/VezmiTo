import { type, isEmpty } from 'ramda'
import flatten, { unflatten } from 'flat'

export default function removeEmptyValues(obj = {}): Record<string, any> {
  if (type(obj) !== 'Object')
    throw Error(`Unexpected type of object: "${type(obj)}"`)
  if (isEmpty(obj)) return {}
  const flat = { ...flatten(obj) } as Record<string, any>
  Object.keys(flat).forEach((objKey) => {
    if (isEmpty(flat[objKey])) {
      delete flat[objKey]
    }
  })
  return unflatten(flat)
}
