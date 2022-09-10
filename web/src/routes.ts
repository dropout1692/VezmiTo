type Routes = {
  key: string
  name: string
  location: string
  relativePath?: string
}[]
type Route = Routes[number]
export type RouteKeyType = Route['key']
export type RouteLocationType = Route['location']
export type RouteOptionsType = {
  exact?: boolean
}

export const definition = [
  // HOME
  {
    key: 'home',
    name: 'Home',
    location: '/',
  },
  // ADMIN
  {
    key: 'adminDashboard',
    name: 'adminDashboard',
    location: '/admin',
  },
  // INFO
  {
    key: 'privacyPolicy',
    name: 'privacyPolicy',
    location: '/pravidla-ochrany-a-spracovania-osobnych-udajov-gdpr',
  },
  {
    key: 'aboutProject',
    name: 'aboutProject',
    location: '/o-projekte',
  },
] as Routes

function searchBy<K extends keyof Route>(key: K, value: Route[K]) {
  const result = definition.find((item) => item[key] === value)

  if (!result) {
    throw Error(
      `Route definition be condition "${key}" = "${value}" not found!`
    )
  }

  return result
}

export function getRouteByKey<K extends RouteKeyType>(key: K) {
  return searchBy('key', key)
}

export function getRouteLocationByKey(key: RouteKeyType) {
  const route = searchBy('key', key)
  return route.location
}

export function getRouteByLocation(location: RouteLocationType) {
  return searchBy('location', location)
}
