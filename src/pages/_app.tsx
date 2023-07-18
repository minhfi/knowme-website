import 'src/polyfills'

import 'src/styles/_autoload.scss'

import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Loading } from 'src/components'
import { EEnv } from 'src/constants'
import { useBehaviorMapper } from 'src/hooks'
import { LoadingService } from 'src/services'

export default function App({ Component, pageProps }: AppProps) {
  const loading = useBehaviorMapper(LoadingService.loading$)
  return (
    <>
      <Script async src="https://accounts.google.com/gsi/client"></Script>

      {!!EEnv.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${EEnv.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${EEnv.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `}
          </Script>
        </>
      )}

      {loading && <Loading/>}

      <Component {...pageProps}/>
    </>
  )
}
