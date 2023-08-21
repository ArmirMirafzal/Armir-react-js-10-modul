import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Button, Flex, Image, Menu, Text, Title, UnstyledButton } from "@mantine/core";
import { Auth } from "firebase/auth";

interface NavbarProps {
  auth: Auth;
}

const Navbar = ({ auth }: NavbarProps) => {
  const [user] = useAuthState(auth);
  const username = user?.displayName?.split(" ")[0] ? user.displayName?.split(" ")[0] : "";
  console.log(username);

  const image = user?.photoURL ? user?.photoURL : "../../../assets/images/avatar-1295429_640.jpeg";
  return (
    <Box bg="#eee" p={15}>
      <Flex align="center" justify="space-between">
        <Title sx={{ marginLeft: "100px" }}>ChessGame</Title>
        <Flex align="center" gap={10}>
          <Menu shadow="md" width="auto">
            <Menu.Target>
              <UnstyledButton>
                <Flex align="center" gap={7}>
                  <Text>{username}</Text>
                  {username && <Image w="100%" h="100%" styles={{ imageWrapper: { width: "40px", height: "40px" } }} radius="xl" src={image} alt="" />}
                </Flex>
              </UnstyledButton>
            </Menu.Target>
            <Button sx={() => ({ "&:hover": { backgroundColor: "red" }, marginLeft: "40px", marginRight: "40px" })} bg="red" children="logout" w="100%" onClick={() => auth.signOut()} />
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
