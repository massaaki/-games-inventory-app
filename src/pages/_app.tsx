import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { AppProps } from 'next/app'
import Head from 'next/head'
import theme from '../styles/theme'

import GlobalStyles from 'styles/global'
import { useApollo } from 'utils/tests/apollo'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Won Games</title>
          <link rel="shortcut icon" href="/img/icon-512.png" />
          <link rel="apple-touch-icon" href="/img/icon-512.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="Boilerplate start with Nextjs, typescript, React and styled components"
          />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
