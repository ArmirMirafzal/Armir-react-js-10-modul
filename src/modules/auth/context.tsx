import React from "react";

import { IContext } from "./types";

export const AuthContext = React.createContext(null as unknown as IContext.Auth);

export const useAuth = () => {
	const context = React.useContext(AuthContext);

	if (!context) throw new Error("AuthProvider is not available");

	return context;
};
