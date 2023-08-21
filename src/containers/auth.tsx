import React from 'react'
import { LoadingOverlay } from '@mantine/core'
import { AuthContext } from 'modules/auth/context'
import { useProfile } from 'modules/auth/hooks'
import { IContext } from 'modules/auth/types'

interface AuthProps {
  children: React.ReactNode
}

const Auth = ({ children }: AuthProps) => {
  const [state, setState] = useProfile()

  if (state.isLoading) return <LoadingOverlay visible overlayBlur={2} />

  const methods: IContext.Auth['methods'] = {
    update: user => {
      setState(prev => ({ ...prev, user }))
    }
  }

  return <AuthContext.Provider value={{ ...state, methods }}>{children}</AuthContext.Provider>
}

export default Auth
