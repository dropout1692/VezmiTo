// @see https://github.com/moll/json-stringify-safe
import npmStringify from "json-stringify-safe";

export default function stringify(...args: Parameters<typeof npmStringify>) {
  return npmStringify(...args);
}
