import { MantineProvider } from '@mantine/core';
import ReactDOM from "react-dom/client";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { createContext } from "react";
import { Types } from "./modules/auth";
import { Routes } from "./routes";
import "./assets/main.css";
import { Toaster } from 'react-hot-toast';
import { config } from './config';

const app = initializeApp(config.firebaseConfig);

const auth = getAuth(app);
const firestore = getStorage(app);

export const Context = createContext<Types.IContext>({} as Types.IContext);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<MantineProvider withGlobalStyles withNormalizeCSS>
	<Context.Provider value={{auth, firestore}}>
	<Toaster position="top-center"/>
	<Routes/>
	</Context.Provider>
	</MantineProvider>
);
