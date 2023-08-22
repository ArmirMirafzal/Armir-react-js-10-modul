import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingOverlay } from '@mantine/core'
import { emailVerify } from 'modules/auth/service'
import queryString from 'query-string'

import ResetPassword from './reset-password'

interface ActionProps {}

interface IAction {
  mode: 'verifyEmail' | 'resetPassword'
  oobCode: string
}

const Action = (props: ActionProps) => {
  const navigate = useNavigate()
  const { mode, oobCode } = queryString.parse(window.location.search) as unknown as IAction
  const [isResetPassword, setIsResetPassword] = useState(false)

  useEffect(() => {
    const handleAction = async () => {
      switch (mode) {
        case 'verifyEmail':
          await emailVerify(oobCode)
          navigate('/')
          break
        case 'resetPassword':
          setIsResetPassword(true)
          break
        default:
          navigate('/')
      }
    }

    handleAction()
  }, [mode, navigate, oobCode])

  if (isResetPassword) return <ResetPassword oobCode={oobCode} />

  return <LoadingOverlay visible overlayBlur={2} />
}

export default Action
