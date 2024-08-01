import { Token } from "../../token/token.model";

export interface AuthDatabaseI {
  signIn(email: string, password: string): Promise<Token>;
  signUp(email: string, password: string): Promise<void>;
  forgotPassword(email: string): Promise<void>;
}
