import * as yup from "yup";
import { useContext } from "react";
import { Context } from "../..";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Paper, PasswordInput, Title } from "@mantine/core";
import { toast } from "react-hot-toast";
import { useForm, yupResolver } from "@mantine/form";
import { Types } from "../../modules/auth";

const schema = yup.object({
  email: yup.string().email().label("Email").required(),
  name: yup.string().label("Name").required(),
  password: yup.string().min(5).label("Password").required(),
});

const Register = () => {
  const { getInputProps, onSubmit } = useForm<Types.IForm.Register>({ validate: yupResolver(schema) });
  const navigate = useNavigate();
  const { auth } = useContext(Context);

  const RegisterSubmit = async ({ email, password, name }: Types.IForm.Register) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, {
        displayName: name,
      });
	  
      console.log("user =>", user);
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Box h="100vh">
      <Flex h="100%" align="center" justify="center">
        <Paper shadow="0px 0px 17px 5px rgba(0, 40, 255, 0.3)" h={500} bg="#131720" w={400} p={20}>
          <form style={{ paddingTop: "45px" }} onSubmit={onSubmit(RegisterSubmit)}>
            <Flex direction="column" align="center" gap={20}>
              <Title sx={{ paddingBottom: "20px" }} color="#fff" size={30}>
                Register to Armir-chess
              </Title>
              <Input radius="lg" w="100%" size="md" type="text" placeholder="name" {...getInputProps("name")} />
              <Input sx={{ marginTop: "10px" }} radius="lg" w="100%" size="md" type="email" placeholder="email" {...getInputProps("email")} />
              <PasswordInput sx={{ marginTop: "10px" }} radius="lg" w="100%" size="md" placeholder="password" {...getInputProps("password")} />
              <Button mt="20px" type="submit" radius="md" w="50%">
                Register
              </Button>
              <Link style={{ textDecoration: "none", color: "#228BE6" }} to="/auth/login" children="Already have an account?" />
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  );
};

export default Register;
