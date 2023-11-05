export function setUrlParameters(data: Record<string, string | number> = {}) {
  const sp = new URLSearchParams(window.location.search)
  Object.entries(data).forEach(([key, value]) => {
    sp.set(key, value as string)
  })

  const newurl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    '?' +
    sp.toString()

  window.history.pushState({ path: newurl }, '', newurl)
}

// to remove the specific key
export function removeUrlParameter(paramKey: string) {
  const url = window.location.href
  const r = new URL(url)
  r.searchParams.delete(paramKey)
  const newUrl = r.href

  window.history.pushState({ path: newUrl }, '', newUrl)
}

export function getUrlParameters(): Record<string, any> {
  const sp = new URLSearchParams(window.location.search)
  let params = {}
  for (const [key, value] of sp.entries()) {
    params = {
      ...params,
      [key]: value,
    }
  }

  return params
}
