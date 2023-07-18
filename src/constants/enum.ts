import { AxiosError } from 'axios'

/**
 * @readonly
 * @enum
 */
export enum EErrorCode {
  EMAIL_USED = 'EMAIL_USED'
}

export const getMessageFromErrorCode = (error: EErrorCode) => {
  switch (error) {
    case EErrorCode.EMAIL_USED:
      return 'Email has already been taken. Please use a different email.'
    default:
      return 'Something went wrong. Please try again later.'
  }
}

export const getErrorMessage = (error: AxiosError | any) => error?.response?.data?.message || ''
