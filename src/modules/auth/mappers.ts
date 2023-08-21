import get from 'lodash/get'

import { IEntity } from './types'

export const User = (item: any): IEntity.User => ({
  name: get(item, 'displayName') || '',
  avatarURL: get(item, 'photoURL') || '',
  email: get(item, 'email') || '',
  isVerified: get(item, 'emailVerified')
})
