import { Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";

export namespace IEntity {
  export interface User {
    email: string;
    username: string;
    password: string;
  }
}

export namespace IForm {
  export interface Login {
    email: string;
    password: string;
  }

  export interface Register extends Login {
    name: string
  }
  export interface sendResetPassword {
    email: string;
  }
  export interface confirmResetPassword {
    password: string;
  }
}

export interface IContext {
  auth: Auth;
  firestore: FirebaseStorage;
}
