import clsx from 'clsx'
import { FC, InputHTMLAttributes, ReactNode, useMemo, useState } from 'react'

import Style from './style.module.scss'

interface IInputProps {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'regular' | 'small'
  error?: any
  errors?: any
  startIcon?: ReactNode
  endIcon?: ReactNode
}

enum EInputVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

enum EInputSize {
  REGULAR = 'regular',
  SMALL = 'small'
}

export const Input: FC<
  Omit<InputHTMLAttributes<Element>, 'size'> & IInputProps
> = ({
  children,
  error,
  errors,
  size = EInputSize.REGULAR,
  variant = EInputVariant.PRIMARY,
  startIcon: StartIcon,
  endIcon: EndIcon,
  ...props
}) => {
  const [focus, setFocus] = useState(false)

  const errorMessage = useMemo<string | undefined>(
    () =>
      error ||
      (Array.isArray(errors) && errors[0]) ||
      (Object.isObject(errors) && Object.values(errors)[0]),
    [error, errors]
  )

  return (
    <div
      className={clsx('fx-row w-100 fx-ai-center', Style.inputContainer, {
        [Style.primary]: variant === 'primary',
        [Style.secondary]: variant === 'secondary',
        [Style.regular]: size === EInputSize.REGULAR,
        [Style.small]: size === EInputSize.SMALL,
        [Style.focus]: focus
      }, props.className)}
    >
      {StartIcon ? StartIcon : null}
      <input
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={clsx('fx-1 w-100', Style.input, {
          [Style.error]: !!errorMessage,
          [Style.readonly]: props.readOnly,
          [Style.primary]: variant === 'primary',
          [Style.secondary]: variant === 'secondary',
          [Style.regular]: size === EInputSize.REGULAR,
          [Style.small]: size === EInputSize.SMALL
        })}
      />
      {EndIcon ? EndIcon : null}
      {errorMessage ? (
        <span className={Style.input_txtError}>{errorMessage}</span>
      ) : null}
    </div>
  )
}
