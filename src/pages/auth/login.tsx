import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Anchor, Button, Container, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { Service } from 'modules/auth'
import { signInWithGoogle } from 'modules/auth/service'
import { IForm } from 'modules/auth/types'
import * as yup from 'yup'

import { GoogleButton } from 'components'

const schema = yup.object({
  email: yup.string().email().label('Email').required(),
  password: yup.string().min(6).label('Password').required()
})

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const form = useForm<IForm.Login>({
    initialValues: { email: '', password: '' },
    validate: yupResolver(schema)
  })

  const onSubmit = async (values: IForm.Login) => {
    try {
      setLoading(true)
      await Service.login(values)
    } catch (err: any) {
      notifications.show({ message: err?.message, color: 'red' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500} sx={{ textAlign: 'center' }}>
          Welcome to Chess Game
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={signInWithGoogle} children="Google" />
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput label="Email" placeholder="Your email address" radius="md" {...form.getInputProps('email')} />

            <PasswordInput label="Password" placeholder="Your password" radius="md" {...form.getInputProps('password')} />
          </Stack>

          <Anchor
            sx={{ marginTop: '10px' }}
            component="button"
            type="button"
            color="dimmed"
            onClick={() => navigate('/forgotPassword')}
            size="sm"
            children="Forgot Password"
          />

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" onClick={() => navigate('/auth/register')} size="sm">
              Don't have an account? Register
            </Anchor>
            <Button loading={loading} type="submit" radius="xl" children="Login" />
          </Group>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
