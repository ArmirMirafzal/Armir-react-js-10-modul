import React from 'react'
import { Button, Flex } from '@mantine/core'
import { Service } from 'modules/auth'
import { alert } from 'utils'

import { Navbar } from 'components'

interface VerificationProps {}

const Verification = (props: VerificationProps) => {
  const [loading, setLoading] = React.useState(false)

  const onSend = async () => {
    try {
      setLoading(true)

      await Service.sendVerification()

      alert.success('Sent verification link 🎉')

      setLoading(false)
    } catch (err: any) {
      alert.error(err?.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <Flex className="container" pt={10}>
        <Button onClick={onSend} loading={loading}>
          Send Code
        </Button>
      </Flex>
    </>
  )
}

export default Verification
