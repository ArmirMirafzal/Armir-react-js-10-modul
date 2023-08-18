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
  const { getInputProps, onSubmit } = useForm<Types.IForm.Auth>({ validate: yupResolver(schema) });
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

  const handleSubmit = async ({ email, password }: Types.IForm.Auth) => {
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
        <Paper w={400} bg="#eee" p={20}>
          <form onSubmit={onSubmit(handleSubmit)}>
            <Flex direction="column" align="center" gap={20}>
              <Title>Login</Title>
              <Input radius="lg" w="100%" size="lg" type="email" placeholder="email" {...getInputProps("email")} />
              <Flex w="100%" direction="column" align="start">
                <PasswordInput radius="lg" w="100%" size="lg" placeholder="password" {...getInputProps("password")} />
                <Link to="/auth/forgot-password" children="Forgot password" />
              </Flex>
              <Button type="submit" radius="md" w="50%">
                Login
              </Button>
              <Button variant="default" onClick={loginWithGoogle} radius="md" w="70%">
                <FcGoogle size={20} />
                <Space w="xs" />
                Sign in with google
              </Button>
              <Link to="/auth/register" children="Don't have an account?" />
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  );
};

export default Login;
