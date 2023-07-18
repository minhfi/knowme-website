import { Switch as _Switch } from 'antd'
import clsx from 'clsx'
import { ComponentProps, FC } from 'react'
import Style from './style.module.scss'

export const Switch: FC<ComponentProps<typeof _Switch>> = (props) => {
  return (
    <_Switch
      {...props}
      className={clsx(Style.switch, props.className)}
    />
  )
}
