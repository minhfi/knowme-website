import { FC, ReactNode } from 'react'
import Style from './style.module.scss'

export const Overlay: FC<{ children: ReactNode }> = (props) => {
  return (
    <div className={Style.overlay}>
      {props.children}
    </div>
  )
}
