const constants: { [key: string]: any } = {
  API_SERVER_URL: process.env.REACT_APP_API_SERVER_URL,
  ARTICLE_API: "/articles",
  LOGIN_API: "/auth/login",
  LOGOUT_API: "/auth/logout",
  TOKEN_NAME: "koa:sess"
};

class Constants {
  public static get ARTICLE_API_URL() {
    return constants.API_SERVER_URL + constants.ARTICLE_API;
  }

  public static get LOGIN_API_URL() {
    return constants.API_SERVER_URL + constants.LOGIN_API;
  }

  public static get LOGOUT_API_URL() {
    return constants.API_SERVER_URL + constants.LOGOUT_API;
  }

  public static get TOKEN_NAME() {
    return constants.TOKEN_NAME;
  }

  public static get TOKEN_SIG_NAME() {
    return constants.TOKEN_NAME + ".sig";
  }
}

Object.freeze(Constants);
export default Constants;
