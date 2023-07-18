import { Layout } from 'src/layouts'
import Style from './style.module.scss'

const NotFound = () => {
  return (
    <Layout>
      <div className={Style.notFound}>
        <p>404 | Page Not Found</p>
      </div>
    </Layout>
  )
}

export default NotFound
