import { Checkbox as _Checkbox } from 'antd'
import clsx from 'clsx'
import { ComponentProps, FC } from 'react'

export const CheckboxGroup: FC<
  ComponentProps<typeof _Checkbox.Group>
> = ({ className, ...props }) => {
  return (
    <_Checkbox.Group
      className={clsx(className)}
      {...props}
    />
  )
}
