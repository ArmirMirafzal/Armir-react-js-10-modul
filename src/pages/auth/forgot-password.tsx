import React from 'react'
import { Box, Button, Container, Flex, Paper, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Service } from 'modules/auth'
import { alert } from 'utils'
import { object, string } from 'yup'

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false)

  const schema = object({
    email: string().email().label('Email').required()
  })

  const { getInputProps, onSubmit } = useForm({ validate: yupResolver(schema) })

  const onForgot = async ({ email }: any) => {
    try {
      setLoading(true)

      await Service.sendResetPasswordLink(email)

      alert.success('Sent forgot password link 🎉')
      setLoading(false)
    } catch (err: any) {
      alert.error(err?.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Container sx={{ display: 'grid', placeItems: 'center', marginTop: 100 }}>
        <Box>
          <Title sx={{ fontWeight: 500, marginBottom: 20 }}>Forgot Password</Title>

          <Paper shadow="1px 1px 2px #222" sx={{ display: 'flex', flexDirection: 'column', gap: 25, alignItems: 'center', padding: '30px 20px' }}>
            <form style={{ width: 350 }} onSubmit={onSubmit(onForgot)}>
              <Flex direction="column" gap={20}>
                <TextInput label="Email address" {...getInputProps('email')} />
                <Button loading={loading} type="submit" sx={{ fontSize: 19, height: 42 }}>
                  Reset
                </Button>
              </Flex>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default ForgotPassword
