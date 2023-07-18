/**
 * @typedef {import('axios').AxiosError} AxiosError
 */

import { AxiosError, AxiosResponse } from 'axios'
import { IObject } from 'src/interfaces'

export class AxiosUtils {
  static getMessageByStatusCode(response: AxiosResponse): string {
    const code = response.status
    switch (code) {
      case 400:
        return 'Bad request'
      case 401:
        return 'Unauthorized'
      case 403:
        return 'Forbidden'
      case 404:
        return 'Not found'
      case 500:
        return 'Internal server error'
      default:
        // return 'Unknown error'
        return (
          response.data &&
          (
            response.data.message ||
            response.data.error ||
            JSON.stringify(response.data, null, 2)
          )
        ) || 'Unknown error'
    }
  }

  /**
   * Get axios response error message
   * @param {AxiosError} e
   * @return {string}
   */
  static getApiErrorMessage(e: any) {
    const error = e as AxiosError<IObject, IObject>

    try {
      if (error.response && typeof error.response === 'object') {
        const response = error.response
        const message = response.data?.message || AxiosUtils.getMessageByStatusCode(response)
        return message
      }

      return typeof error === 'string'
        ? error
        : error?.message || JSON.stringify(error, null, 2)
    } catch (err) {
      return String(error)
    }
  }

  /**
   * Get axios response error message
   * @param {AxiosError} error
   * @return {string}
   */
  static getApiErrorCode(error: any) {
    const data = error?.response?.data
    return data?.details?.errorCode
  }
}
