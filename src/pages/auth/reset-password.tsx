import React, { useState } from 'react'
import { Box, Button, Container, Flex, Paper, PasswordInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { confirmPassword } from 'modules/auth/service'
import { alert } from 'utils'
import { object, string } from 'yup'

interface ResetPasswordProps {
  oobCode: string
}

const ResetPassword = ({ oobCode }: ResetPasswordProps) => {
  const schema = object({
    password: string().min(5).label('Password').required()
  })

  const { getInputProps, onSubmit } = useForm({ validate: yupResolver(schema) })
  const [loading, setLoading] = useState(false)

  const onReset = async ({ password }: any) => {
    setLoading(true)

    try {
      await confirmPassword(oobCode, password)

      setLoading(false)
      window.location.href = '/'

      alert.success('Sent reset password link 🎉')
    } catch (err: any) {
      alert.error(err?.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Container sx={{ display: 'grid', placeItems: 'center', marginTop: 100 }}>
        <Box>
          <Title sx={{ fontWeight: 500, marginBottom: 20 }}>Reset Password</Title>
          <Paper shadow="1px 1px 2px #222" sx={{ display: 'flex', flexDirection: 'column', gap: 25, alignItems: 'center', padding: '30px 20px' }}>
            <form style={{ width: 350 }} onSubmit={onSubmit(onReset)}>
              <Flex direction="column" gap={20}>
                <PasswordInput label="New password" {...getInputProps('password')} />
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

export default ResetPassword
