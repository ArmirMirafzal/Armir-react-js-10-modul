import { auth, googleProvider } from 'config'
// eslint-disable-next-line import/order
import {
  applyActionCode,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile as baseUpdateProfile,
  User
} from 'firebase/auth'

import { IForm } from './types'

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const logout = () => auth.signOut()

export const register = ({ email, password }: Pick<IForm.Register, 'email' | 'password'>) => createUserWithEmailAndPassword(auth, email, password)

export const updateProfile = (user: User, { name }: Omit<IForm.Register, 'email' | 'password'>) => baseUpdateProfile(user, { displayName: name })

export const login = ({ email, password }: IForm.Login) => signInWithEmailAndPassword(auth, email, password)

export const sendVerification = () => sendEmailVerification(auth.currentUser!, { url: `${window.location.origin}/verification` })

export const emailVerify = (oobCode: string) => applyActionCode(auth, oobCode)
