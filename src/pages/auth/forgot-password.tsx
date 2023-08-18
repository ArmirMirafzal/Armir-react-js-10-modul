import * as yup from "yup";
import { useContext } from "react";
import { Context } from "../..";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Paper, Title} from "@mantine/core";
import { toast } from "react-hot-toast";
import { useForm, yupResolver } from "@mantine/form";
import { Types } from "../../modules/auth";

const schema = yup.object({
 email: yup.string().min(4).label("Email").required(),
});

const ForgotPassword = () => {
 const { getInputProps, onSubmit } = useForm<Types.IForm.sendResetPassword>({ validate: yupResolver(schema)});
	const navigate = useNavigate();
	const { auth } = useContext(Context);

 const handleSubmit = async ({email}: Types.IForm.sendResetPassword) => {
  try {
   await sendPasswordResetEmail(auth, email, {url: "http://localhost:3000/auth/login"})
   toast.success(`An email is sent to ${email} for password reset instructions.`, {
    duration: 5000,
   });
			// navigate("/");
  } catch (err: any) {
    toast.error(err?.message);
  }
 }

	return (
		<Box h="100vh">
			<Flex h="100%" align="center" justify="center">
			<Paper w={400} bg="#eee" p={20}>
					<form onSubmit={onSubmit(handleSubmit)}>
						<Flex direction="column" align="center" gap={20}>
      <Title>ForgotPassword</Title>
      <Input radius="lg"  w="100%" size="lg" type="email" placeholder="email" {...getInputProps("email")}/>
						<Button type="submit" radius="md" w="50%">Send ResetPassword</Button>
      <Link to="/auth/login"  children="Login"/>
      </Flex>
					</form>
			</Paper>
				</Flex>
		</Box>
	);
};

export default ForgotPassword;
