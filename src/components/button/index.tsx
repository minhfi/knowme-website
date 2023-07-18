import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react'
import { Spinner } from '../spinner'
import Style from './style.module.scss'

enum EBtnType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ICON = 'icon'
}

enum EBtnSize {
  REGULAR = 'regular',
  LARGE = 'large'
}

interface IButtonProps {
  className?: string
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'icon'
  size?: 'regular' | 'large'
  active?: boolean
  loading?: boolean
  disabled?: boolean
}

const SPINNER_SIZES = {
  regular: 24,
  large: 28
}

const SPINNER_COLORS = {
  regular: Style.neutral100,
  large: Style.neutral100
}

export const Button: FC<
  Omit<ButtonHTMLAttributes<Element>, keyof IButtonProps> & IButtonProps
> = ({
  variant = EBtnType.PRIMARY,
  size = EBtnSize.REGULAR,
  loading = false,
  disabled = false,
  active = false,
  className,
  children,
  ...props
}) => {
  const spinnerSize = useMemo(() => SPINNER_SIZES[size], [size])
  const spinnerColor = useMemo(() => SPINNER_COLORS[size], [size])

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={clsx([
        Style.Btn,
        {
          [Style.primary]: variant === EBtnType.PRIMARY,
          [Style.secondary]: variant === EBtnType.SECONDARY,
          [Style.icon]: variant === EBtnType.ICON,
          [Style.regular]: size === EBtnSize.REGULAR,
          [Style.large]: size === EBtnSize.LARGE,
          [Style.active]: active
        },
        className
      ])}
    >
      {loading ? <Spinner size={spinnerSize} color={spinnerColor}/> : children}
    </button>
  )
}
