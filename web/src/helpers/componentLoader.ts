import { ComponentType } from 'react'

/**
 * It will try to load lazy component, if it fails it will retry specified number of tries.
 * @source https://medium.com/@botfather/react-loading-chunk-failed-error-88d0bb75b406
 * @param lazyComponent - lazy component to load
 * @param attemptsLeft - number of retries
 * @param retryTimeout - timeout after it will retry to load the component again
 * @returns {Promise<unknown>}
 */
function componentLoader(
  lazyComponent: () => any,
  attemptsLeft = 3,
  retryTimeout = 1000,
) {
  return new Promise<{ default: ComponentType<any> }>((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error: Error) => {
        // retry after specified amount of time
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error)
            return
          }

          componentLoader(lazyComponent, attemptsLeft - 1, retryTimeout).then(
            resolve,
            reject,
          )
        }, retryTimeout)
      })
  })
}

export default componentLoader
