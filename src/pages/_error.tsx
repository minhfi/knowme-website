import { NextPageContext } from 'next'
import { ErrorProps } from 'next/error'
import { Layout } from 'src/layouts'

export default function Error({
  title,
  statusCode,
  withDarkMode
}: ErrorProps) {
  return (
    <Layout>
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1
          style={{
            display: 'inline-block',
            margin: '0',
            marginRight: '20px',
            padding: '0 23px 0 0',
            fontSize: '24px',
            fontWeight: '500',
            verticalAlign: 'top',
            lineHeight: '49px',
            borderRight: '1px solid rgba(255, 255, 255, .3)'
          }}
        >{statusCode}</h1>
        <h2
          style={{
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 'normal',
            lineHeight: '49px',
            margin: '0',
            padding: '0'
          }}
        >{title}</h2>
      </div>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res
    ? res.statusCode
    : err
      ? err.statusCode
      : 404
  return { statusCode, title: err?.message || res?.statusMessage || 'This page could not be found' }
}
