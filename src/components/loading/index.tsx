import { FC } from 'react'
import { ClipLoader } from 'react-spinners'
import { Overlay } from '../overlay'
import Style from './style.module.scss'

export const Loading: FC = () => {
  return (
    <Overlay>
      <ClipLoader color={Style.primary500}/>
    </Overlay>
  )
}
