import { Checkbox as _Checkbox } from 'antd'
import clsx from 'clsx'
import { ComponentProps, FC } from 'react'

export const Checkbox: FC<
  ComponentProps<typeof _Checkbox>
> = ({ className, ...props }) => {
  return (
    <_Checkbox
      className={clsx(['customAntdCheckbox', className])}
      {...props}
    />
  )
}
