import store from "store2";

export const getSession = () => store.get("accesstoken") || "";

export const clearSession = () => store.remove("accesstoken");

export const setSession = (token: string) => store.set("accesstoken", token);
