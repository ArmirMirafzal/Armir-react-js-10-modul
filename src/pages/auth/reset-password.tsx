import * as yup from "yup";
import { confirmPasswordReset } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Types } from "../../modules/auth";
import { useForm, yupResolver } from "@mantine/form";
import { Context } from "../..";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Box, Button, Flex, Paper, PasswordInput, Title } from "@mantine/core";
import { Link } from "react-router-dom";

interface ResetPasswordProps {}

const useQuery = () => new URLSearchParams(useLocation().search);

const schema = yup.object({
  password: yup.string().min(4).label("Password").required(),
});

const ResetPassword = (props: ResetPasswordProps) => {
  const { getInputProps, onSubmit } = useForm<Types.IForm.confirmResetPassword>({ validate: yupResolver(schema) });
  const query = useQuery();
  //  const oobCode = query.get("oobCode");
  const { auth } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = async ({ password }: Types.IForm.confirmResetPassword) => {
    console.log("hello");
    try {
      const user = await confirmPasswordReset(auth, query.get("oobCode")!, password);
      console.log(user);
      toast.success(`Password has been changed, you can login now.`, {
        duration: 5000,
      });
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
              <Title>ResetPassword</Title>
              <PasswordInput radius="lg" w="100%" size="lg" placeholder="password" {...getInputProps("password")} />
              <Button type="submit" radius="md" w="55%">
                confirm ResetPassword
              </Button>
              <Link to="/auth/login" children="Login" />
            </Flex>
          </form>
        </Paper>
      </Flex>
    </Box>
  );
};

export default ResetPassword;
