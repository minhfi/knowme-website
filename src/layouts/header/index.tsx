import { IconLogo } from 'src/icons'
import Style from './style.module.scss'

export function Header() {
  return (
    <div className={Style.header}>
      <div className={Style.company}>
        <div className={Style.logo}>
          <IconLogo/>
        </div>
        <p className={Style.companyName}>Show your human side&#8482;</p>
      </div>
    </div>
  )
}
