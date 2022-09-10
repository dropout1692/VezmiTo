import removeEmptyValues from './removeEmptyValues'

describe('removeEmptyValues', () => {
  it('should return empty object if no arguments given', () => {
    expect(removeEmptyValues()).toEqual({})
  })
  it('should throw if not valid object given', () => {
    expect(() => removeEmptyValues('')).toThrow(/Unexpected type/)
    expect(() => removeEmptyValues(String('foo'))).toThrow(/Unexpected type/)
    expect(() => removeEmptyValues([])).toThrow(/Unexpected type/)
    expect(() => removeEmptyValues(new Array('foo'))).toThrow(/Unexpected type/)
    expect(() => removeEmptyValues(5)).toThrow(/Unexpected type/)
    expect(() => removeEmptyValues(Number(5))).toThrow(/Unexpected type/)
  })
  it('should return object without properties with empty values', () => {
    expect(
      removeEmptyValues({
        foo: 'x',
        bar: '',
      }),
    ).toStrictEqual({
      foo: 'x',
    })

    expect(
      removeEmptyValues({
        foo: 'x',
        y: '',
        bar: [
          {
            x: {},
          },
        ],
      }),
    ).toStrictEqual({
      foo: 'x',
    })

    expect(
      removeEmptyValues({
        foo: 'x',
        y: '',
        bar: [
          {
            id: 1,
            x: '',
          },
        ],
      }),
    ).toStrictEqual({
      foo: 'x',
      bar: [
        {
          id: 1,
        },
      ],
    })

    expect(
      removeEmptyValues({
        foo: 'x',
        bar: [
          {
            id: 1,
            x: '',
          },
          {
            y: '',
          },
        ],
      }),
    ).toStrictEqual({
      foo: 'x',
      bar: [
        {
          id: 1,
        },
      ],
    })
  })
})
