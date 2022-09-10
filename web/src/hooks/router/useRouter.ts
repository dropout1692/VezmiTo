/* eslint-disable no-use-before-define */
import { useNavigate, generatePath } from 'react-router-dom'
import { stringify } from 'query-string'
import {
  getRouteByKey,
  getRouteLocationByKey,
  RouteKeyType,
  RouteOptionsType,
} from '../../routes'
import removeEmptyValues from '../../tools/removeEmptyValues'

function registerRoute(
  routeKey: RouteKeyType,
  { exact = false }: RouteOptionsType = {},
) {
  const location = getRouteLocationByKey(routeKey)

  return exact ? location : `${location}/*`
}

export default function useRouter() {
  const navigate = useNavigate()

  function generateRoutePath(
    routeKey: RouteKeyType,
    params = {},
    queryString?: object,
  ) {
    try {
      const route = getRouteByKey(routeKey)
      const url = generatePath(route.location, params)
      return queryString
        ? `${url}?${stringify(removeEmptyValues(queryString))}`
        : url
    } catch (err) {
      console.warn('[router]', err)
      return '/'
    }
  }

  function pushRoute(
    routeKey: RouteKeyType,
    params = {},
    queryString?: object,
  ) {
    const targetHref = generateRoutePath(routeKey, params, queryString)
    navigate(targetHref)
  }

  function pushCustomPath(path: string, state?: any) {
    navigate(path, state)
  }

  return {
    registerRoute,
    // use in Route definitions
    generateRoutePath,
    // generate final url string with parsed params + auto handle folderId by selected folder
    pushRoute, // use history.push to route

    pushCustomPath,

    goBack: () => navigate(-1),
  }
}
