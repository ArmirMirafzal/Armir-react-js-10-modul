import { Flex } from '@mantine/core'

import { Navbar } from 'components'

import Game from './game'

const Home = () => (
  <Flex direction="column" h="100vh">
    <Navbar />
    <Game />
  </Flex>
)

export default Home
