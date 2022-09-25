import "next-auth";

// Required to add id to user
declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: User;
  }
}
