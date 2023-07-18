import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnySchema, ObjectSchema, ValidationError } from 'yup'
import Lazy from 'yup/lib/Lazy'
import { ObjectShape } from 'yup/lib/object'
import { ValidateOptions } from 'yup/lib/types'

type TPayload<T> = {
  data: T
  schema: AnySchema | ObjectSchema<ObjectShape> | Lazy<ObjectSchema<ObjectShape>>
  options?: ValidateOptions
  validateOnChange?: boolean
}

export class ErrorBag<T extends Record<string, any>> {
  errors: Record<string, string[] | undefined> = {}

  constructor(validationError?: ValidationError) {
    if (!validationError) {
      return
    }

    for (const error of validationError.inner) {
      const path = error.path
      if (!path) {
        continue
      }

      this.errors[path] = [
        ...(this.errors[path] || []),
        error.message
      ]
    }
  }

  hasError(field?: TStartWith<keyof T>) {
    if (field) {
      return !!this.errors[field as string]
    }
    return !!Object.keys(this.errors).length
  }

  getErrors(field?: TStartWith<keyof T>) {
    if (field) {
      return this.errors[field as string]
    }
    return Object.values(this.errors)[0]
  }

  getError(field?: TStartWith<keyof T>) {
    return this.getErrors(field)?.[0]
  }

  hasErrorMatch(re: RegExp) {
    return !!Object.entries(this.errors).some(([key]) => re.test(key))
  }

  getErrorsMatch(re: RegExp) {
    const item = Object.entries(this.errors).find(([key]) => re.test(key))
    if (item) {
      return item[1]
    }
  }

  getErrorMatch(re: RegExp) {
    return this.getErrorsMatch(re)?.[0]
  }

  clearError(field?: TStartWith<keyof T>) {
    if (field) {
      delete this.errors[field as string]
    } else {
      this.errors = {}
    }

    return this.newInstance()
  }

  setError(field: TStartWith<keyof T>, message: string) {
    this.errors[field as string] = [message]
    return this.newInstance()
  }

  newInstance() {
    const errorBag = new ErrorBag()
    errorBag.errors = this.errors
    return errorBag
  }
}

export const useValidation = <T extends Record<string, any>>({
  data,
  schema,
  options,
  validateOnChange
}: TPayload<T>) => {
  const [errors, setErrors] = useState<ErrorBag<T>>(new ErrorBag())
  const validatedRef = useRef(false)
  const isMountedRef = useRef(false)
  const payload = useMemo(() => ({
    data,
    schema,
    options,
    validateOnChange
  }), [data, options, schema, validateOnChange])

  const getValidationMessage = useCallback((validationError: ValidationError, field: keyof T) => {
    for (const error of validationError.inner) {
      if (error.path === field) {
        return error.message
      }
    }
  }, [])

  const setError = useCallback((field: TStartWith<keyof T>, message?: string) => {
    setErrors(
      (prev) => message
        ? prev.setError(field, message)
        : prev.clearError(field)
    )
  }, [])

  const clearError = useCallback((field?: TStartWith<keyof T>) => {
    setErrors((prev) => prev.clearError(field))
  }, [])

  const validate = useCallback(
    ({
      data = payload.data,
      schema = payload.schema,
      options = payload.options || { abortEarly: false },
      isSync = false
    }: TPayload<T> & { isSync?: boolean } = payload): {
      value?: T
      isValid: boolean
      errors?: ErrorBag<T>
    } | Promise<{
      value?: T
      isValid: boolean
      errors?: ErrorBag<T>
    }> => {
      validatedRef.current = true

      if (isSync) {
        try {
          const value = schema.validateSync(data, options)

          if (isMountedRef.current) {
            clearError()
          }

          return {
            value,
            isValid: true
          }
        } catch (error) {
          if (isMountedRef.current) {
            setErrors(new ErrorBag(error as ValidationError))
          }

          return { isValid: false }
        }
      }

      return schema.validate(data, options)
        .then((value) => {
          if (isMountedRef.current) {
            clearError()
          }
          return {
            value,
            isValid: true
          }
        })
        .catch((err: ValidationError) => {
          const errors = new ErrorBag(err)

          if (!validatedRef.current) {
            return { isValid: true, errors }
          }

          if (isMountedRef.current) {
            setErrors(errors)
          }

          return { isValid: false, errors }
        })
    },
    [clearError, payload]
  )

  const validateAt = useCallback(
    ({
      field,
      data = payload.data,
      schema = payload.schema,
      options = payload.options || { abortEarly: false }
    }: Partial<TPayload<T>> & { field: string }) => {
      return schema
        .validateAt(field, data, options)
        .then(() => {
          if (isMountedRef.current) {
            clearError(field as TStartWith<keyof T>)
          }
          return true
        })
        .catch((err: ValidationError) => {
          if (isMountedRef.current) {
            setError(field as TStartWith<keyof T>, getValidationMessage(err, field))
          }
        })
    },
    [payload.data, payload.schema, payload.options, clearError, setError, getValidationMessage]
  )

  const reset = useCallback(() => {
    validatedRef.current = false
    setErrors(new ErrorBag())
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!Object.keys(errors).length) {
      validatedRef.current = false
    }
  }, [errors])

  useLayoutEffect(() => {
    if (isMountedRef.current && (
      validatedRef.current || payload.validateOnChange
    )) {
      validate()
    }
  }, [payload.validateOnChange, validate])

  return {
    errors,
    validate,
    validateAt,
    setError,
    clearError,
    reset
  }
}
