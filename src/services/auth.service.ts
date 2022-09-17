import api from "./api";
import TokenService from "./token.service";
import { AuthModel } from "@/models/auth.model";

class AuthService {
  login({ email, password }) {
    return api
      .post("/auth/authorize", {
        email,
        password
      })
      .then((response) => {
        if ((response.data as AuthModel).token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
