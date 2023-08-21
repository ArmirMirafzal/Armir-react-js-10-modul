import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Input, Paper, Title } from "@mantine/core";
// import { toast } from "react-hot-toast";
import { useForm, yupResolver } from "@mantine/form";
import { sendPasswordResetEmail } from "firebase/auth";
import { Types } from "modules/auth";
// import { Context } from ";
// eslint-disable-next-line import/order
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().min(4).label("Email").required(),
});

const ForgotPassword = () => {
  const { getInputProps, onSubmit } = useForm<Types.IForm.confirmResetPassword>({ validate: yupResolver(schema) });
  const { auth } = useContext(Context);

  const handleSubmit = async ({ email }: Types.IForm.sendResetPassword) => {
    try {
      await sendPasswordResetEmail(auth, email, { url: "http://localhost:3000/auth/login" });
      // toast.success(`An email is sent to ${email} for password reset instructions.`, {
        // duration: 5000,
      // });
    } catch (err: any) {
      // toast.error(err?.message);
    }
  };

  return (
    <Box h="100vh">
      <Flex h="100%" align="center" justify="center">
        <Paper shadow="0px 0px 17px 5px rgba(0, 40, 255, 0.3)" h={350} bg="#131720" w={400} p={20}>
          <form style={{ paddingTop: "20px" }} onSubmit={onSubmit(handleSubmit)}>
            <Flex direction="column" align="center" gap={20}>
              <Title sx={{ paddingBottom: "20px" }} color="#fff">
                Forgot Password
              </Title>
              <Input radius="lg" w="100%" size="md" type="email" placeholder="email" {...getInputProps("email")} />
              <Button mt="40px" type="submit" radius="md" w="50%">
                Send Reset Password
              </Button>
              <Link style={{ textDecoration: "none", color: "#228BE6" }} to="/auth/login" children="Login" />
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  );
};

export default ForgotPassword;
