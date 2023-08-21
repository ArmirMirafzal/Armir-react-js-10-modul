export namespace IEntity {
  export interface User {
    name: string
    avatarURL?: string
    email: string
    isVerified: boolean
  }
}
export namespace IForm {
  export interface Login {
    email: string
    password: string
  }
  export interface Register {
    name: string
    email: string
    password: string
  }
}

export namespace IContext {
  export interface Auth {
    user: IEntity.User | null
    isLoading: boolean

    isAuthenticated: boolean
    methods: {
      update: (user: IEntity.User) => void
    }
  }
}
