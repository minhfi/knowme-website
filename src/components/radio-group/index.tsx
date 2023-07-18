import { Radio as _Radio } from 'antd'
import { ComponentProps, FC, ReactNode } from 'react'

export const RadioGroup: FC<ComponentProps<typeof _Radio.Group> &{children?: ReactNode}> = ({
  children,
  ...props
}) => {
  return <_Radio.Group {...props}>{children}</_Radio.Group>
}
