import * as yup from "yup";
import { useContext } from "react";
import { Context } from "../..";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Paper, PasswordInput, Space, Title } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useForm, yupResolver } from "@mantine/form";
import { Types } from "../../modules/auth";

const schema = yup.object({
  email: yup.string().min(4).label("Email").required(),
  password: yup.string().min(5).label("Password").required(),
});

const Login = () => {
  const { getInputProps, onSubmit } = useForm<Types.IForm.Login>({ validate: yupResolver(schema) });
  const navigate = useNavigate();
  const { auth } = useContext(Context);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      toast.success(`👋 hello ${user.displayName?.split(" ")[0]}`);
      navigate("/");
    } catch (err: any) {}
  };

  const handleSubmit = async ({ email, password }: Types.IForm.Login) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const username = user.displayName?.split(" ")[0];
      toast.success(`👋 hello ${username ? username : "new user"}`);
      navigate("/");
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Box h="100vh">
      <Flex h="100%" align="center" justify="center">
        <Paper shadow="0px 0px 17px 5px rgba(0, 40, 255, 0.3)" h={450} bg="#131720" w={400} p={20}>
          <form style={{paddingTop: "20px"}} onSubmit={onSubmit(handleSubmit)}>
            <Flex direction="column" align="center" gap={20}>
              <Title sx={{paddingBottom: "20px"}} color="#fff" size={30}>Log in to Armir-chess</Title>
              <Input radius="lg" w="100%" size="md" type="email" placeholder="email" {...getInputProps("email")} />
              <Flex sx={{marginTop: "15px"}} w="100%" direction="column" align="start">
                <PasswordInput radius="lg" w="100%" size="md" placeholder="password" {...getInputProps("password")} />
                <Link style={{ textDecoration: "none", color: "#228BE6", marginTop: "15px" }} to="/auth/forgot-password" children="Forgot password" />
              </Flex>
              <Button type="submit" radius="md" w="50%">
                Log in
              </Button>
              <Button variant="default" onClick={loginWithGoogle} radius="md" w="70%">
                <FcGoogle size={20} />
                <Space w="xs" />
                Log in with google
              </Button>
              <Link style={{ textDecoration: "none", color: "#228BE6" }} to="/auth/register" children="Don't have an account?" />
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  );
};

export default Login;
