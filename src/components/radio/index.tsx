import { Radio as _Radio } from 'antd'
import clsx from 'clsx'
import { ComponentProps, FC } from 'react'

export const Radio: FC<ComponentProps<typeof _Radio>> = ({
  value = '',
  className,
  ...props
}) => {
  return (
    <_Radio
      className={clsx(['customAntdRadio', className])}
      value={value}
      {...props}
    />
  )
}
