import componentLoader from './componentLoader'

describe('componentLoader tests', () => {
  it('should be resolved on the first try', () => {
    // resolve component on the first try
    const component = jest.fn().mockResolvedValue(1)
    return componentLoader(() => component()).then(() => {
      expect(component).toBeCalledTimes(1)
    })
  })
  it('should be resolved on the third try', () => {
    // resolve component on the 3rd try
    const component = jest
      .fn()
      .mockRejectedValueOnce(1)
      .mockRejectedValueOnce(1)
      .mockResolvedValue(1)
    return componentLoader(() => component(), 3, 100).then(() => {
      expect(component).toBeCalledTimes(3)
    })
  })
  it('should be rejected after maximum attempts reached', async () => {
    const retries = 3
    // resolve component on the 3rd try
    const component = jest.fn().mockRejectedValue('error')
    await expect(
      componentLoader(() => component(), retries, 100)
    ).rejects.toMatch('error')
    expect(component).toBeCalledTimes(retries)
  })
})
