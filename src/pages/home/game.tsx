import { useNavigate } from 'react-router-dom'
import { Button, Flex } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useAuth } from 'modules/auth/context'

import { Navbar } from 'components'

const Game = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const onStart = () => {
    if (!user?.isVerified) {
      notifications.show({ color: 'blue', message: 'Email is not verified' })
      navigate('/verification')
    } else {
      notifications.show({ color: 'green', message: 'Start game 🙋' })
      navigate('/chessboard')
    }
  }

  return (
    <>
      <Navbar />
      <Flex sx={{ flex: 1, marginTop: '20%' }} className="container" align="center" justify="center">
        <Button color="lime" size="lg" onClick={onStart}>
          Start Chess
        </Button>
      </Flex>
    </>
  )
}

export default Game
