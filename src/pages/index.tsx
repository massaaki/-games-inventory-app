import Home, { HomeTemplateProps } from 'templates/Home'

import { initializeApollo } from 'utils/apollo'
import { QueryHome, QueryHomeVariables } from 'graphql/generated/QueryHome'
import { QUERY_HOME } from 'graphql/queries/home'
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers'

const Index = (props: HomeTemplateProps) => {
  return <Home {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  const TODAY = new Date().toISOString().slice(0, 10)
  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query<QueryHome, QueryHomeVariables>({
    query: QUERY_HOME,
    variables: { date: TODAY },
    fetchPolicy: 'no-cache' // garantir sempre dado novo na geracao do estatico
  })

  return {
    revalidate: 60,
    props: {
      banners: bannerMapper(banners),
      newGames: gamesMapper(newGames),
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: gamesMapper(sections?.popularGames?.games),
      upcomingGames: gamesMapper(upcomingGames),
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      freeGames: gamesMapper(freeGames),
      freeHighlight: highlightMapper(sections?.freeGames?.highlight),
      newGamesTitle: sections?.newGames?.title,
      mostPopularGamesTitle: sections?.popularGames?.title,
      upcomingGamesTitle: sections?.upcomingGames?.title,
      freeGamesTitle: sections?.freeGames?.title
    }
  }
}

export default Index
