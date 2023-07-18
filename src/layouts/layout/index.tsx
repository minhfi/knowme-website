import clsx, { ClassValue } from 'clsx'
import { FC, ReactNode } from 'react'
import { Footer, Header } from '..'
import Style from './style.module.scss'

interface IProps {
  className?: ClassValue
  children?: ReactNode
}

export const Layout: FC<IProps> = (props) => {
  return (
    <div className={clsx(Style.layout, props.className)}>
      <Header/>

      {props.children}

      <Footer/>
    </div>
  )
}
