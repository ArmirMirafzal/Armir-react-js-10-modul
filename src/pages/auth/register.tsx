import * as yup from "yup";
import { useContext } from "react";
import { Context } from "../..";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Paper, PasswordInput, Title } from "@mantine/core";
import { toast } from "react-hot-toast";
import { useForm, yupResolver } from "@mantine/form";
import { Types } from "../../modules/auth";

const schema = yup.object({
  email: yup.string().min(4).label("Email").required(),
  password: yup.string().min(5).label("Password").required(),
});

const Register = () => {
  const { getInputProps, onSubmit } = useForm<Types.IForm.Auth>({ validate: yupResolver(schema) });
  const navigate = useNavigate();
  const { auth } = useContext(Context);

  const handleSubmit = async ({ email, password }: Types.IForm.Auth) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/auth/login");
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
              <Title>Register</Title>
              <Input radius="lg" w="100%" size="lg" type="email" placeholder="email" {...getInputProps("email")} />
              <PasswordInput radius="lg" w="100%" size="lg" placeholder="password" {...getInputProps("password")} />
              <Button type="submit" radius="md" w="50%">
                Register
              </Button>
              <Link to="/auth/login" children="Already have an account?" />
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  );
};

export default Register;
