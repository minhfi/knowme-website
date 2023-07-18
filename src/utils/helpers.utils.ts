import qs, { IStringifyOptions } from 'qs'
import { REGEX_FULLNAME } from 'src/constants'
import { ValidationError } from 'yup'

/**
 * alphabeticalSort option of qs module
 * @param {String} a
 * @param {String} b
 */
export const alphabeticalSort = (a: string, b: string) => {
  return a.localeCompare(b)
}

// =================================================================================
/**
 * Check input is Object or not
 * @param {Any} obj
 * @return {Boolean}
 */
export const isObject = <T>(obj: T): boolean =>
  obj && typeof obj === 'object' && !Array.isArray(obj)

// =================================================================================
/**
 * Valid input is an Object
 * @param {Any} arr
 * @return {Object}
 */
export const ensureObject = <T, D>(obj: T, defaultValue?: D) =>
  isObject(obj) ? obj : isObject(defaultValue) ? defaultValue : {}

// =================================================================================
/**
 * Valid input is an Object
 * @param {Any} arr
 * @return {Object}
 */
export const ensureArray = <T>(array: T) => (Array.isArray(array) ? array : [])

// =================================================================================
/**
 * Compare two object, true if match
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 */
export const compareObj = <T, K>(obj1: T, obj2: K): boolean => {
  const options: IStringifyOptions = {
    arrayFormat: 'repeat',
    sort: alphabeticalSort
  }
  return (
    qs.stringify(ensureObject(obj1), options) ===
    qs.stringify(ensureObject(obj2), options)
  )
}

// ------------------------------------------------------------------------------------

export const convertErrorYup = <T>(error: ValidationError): T => {
  const errors: T = {} as T
  error.inner.forEach((err: ValidationError) => {
    if (err.path && !errors[err.path as keyof T]) {
      (errors as any)[err.path] = err.message
    }
  })
  return errors
}

export const onClient = <T = any>(callback: () => T) =>
  typeof window !== 'undefined' && callback()

export const formatPhoneNumber = (plainPhone: string) => {
  const match = plainPhone.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }

  return plainPhone
}

export const validateFullName = (fullname = '') => {
  const trimmedFullname = fullname.trim()
  return trimmedFullname.length > 0 && REGEX_FULLNAME.test(trimmedFullname)
}

export const abbreviateFullName = (fullname = '') => fullname.split(' ').map((word) => word[0]).join('').toUpperCase()

const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export const formatNumber = (num: number) => {
  return formatter.format(num)
}

export const sumArray = (arr: number[]) => arr.reduce((prev, curr) => prev + curr, 0)
