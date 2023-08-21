import { Avatar, Box, Flex, Menu, Text } from '@mantine/core'
import { IconChessRook, IconLogout, IconSettings, IconUser } from '@tabler/icons-react'
import { useAuth } from 'modules/auth/context'
import { logout } from 'modules/auth/service'

const Navbar = () => {
  const { user } = useAuth()

  return (
    <Box component="nav" className="navbar" bg="lime" h={70}>
      <Flex className="container" justify="space-between">
        <Flex align="center">
          <IconChessRook color="white" size={40} />
          <Text size="lg" color="white" weight="bold">
            CHESS
          </Text>
        </Flex>
        <Menu shadow="md" width="max-content" position="bottom-end">
          <Menu.Target>
            <Avatar
              sx={{ cursor: 'pointer' }}
              radius="lg"
              alt="it's me"
              size="md"
              {...(user?.avatarURL ? { src: user.avatarURL } : { children: user?.name[0]?.toUpperCase() })}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label sx={{ fontSize: 15 }} color="lime">
              Hi 👋🏻 {user?.email}
            </Menu.Label>
            <Menu.Divider />
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
            <Menu.Item onClick={logout} color="red" icon={<IconLogout size={14} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Box>
  )
}

export default Navbar
