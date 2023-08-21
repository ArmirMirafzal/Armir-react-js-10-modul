import { notifications } from '@mantine/notifications'

export const error = (message: string) => notifications.show({ color: 'red', message })
export const success = (message: string) => notifications.show({ color: 'green', message })
export const info = (message: string) => notifications.show({ color: 'blue', message })
export const warning = (message: string) => notifications.show({ color: 'yellow', message })
