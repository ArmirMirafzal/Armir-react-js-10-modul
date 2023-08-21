import { useContext } from "react";
import { Navbar } from "components";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChessBoard } from "./components";
interface ChessProps {}

const Chess = (props: ChessProps) => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar auth={auth} />
      <div id="app">
        <ChessBoard />
      </div>
    </>
  );
};

export default Chess;
