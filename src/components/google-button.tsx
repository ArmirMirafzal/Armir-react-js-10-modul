import React from "react";
import { Button, ButtonProps } from "@mantine/core";

import { GoogleIcon } from "./google-icon";

interface GoogleButtonProps extends ButtonProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const GoogleButton = (props: GoogleButtonProps) => (
	<Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />
);
