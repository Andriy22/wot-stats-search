import { AuthModel } from "@/models/auth.model";

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("auth")) as AuthModel;
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("auth")) as AuthModel;
    return user?.token;
  }

  updateLocalAccessToken(token) {
    const user = JSON.parse(localStorage.getItem("auth")) as AuthModel;
    user.token = token;
    localStorage.setItem("auth", JSON.stringify(user));
  }

  updateLocalRefreshToken(token) {
    const user = JSON.parse(localStorage.getItem("auth")) as AuthModel;
    user.refreshToken = token;
    localStorage.setItem("auth", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  setUser(user) {
    localStorage.setItem("auth", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("auth");
  }
}

export default new TokenService();
