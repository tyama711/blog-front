const constantSets: { [key: string]: any } = {
  base: {
    API_SERVER_URL: "http://localhost:5000",
    ARTICLE_API: "/articles",
    LOGIN_API: "/auth/login",
    LOGOUT_API: "/auth/logout"
  },
  development: {},
  production: {},
  test: {}
};
const env = process.env.NODE_ENV || "development";
const constants = Object.assign(constantSets.base, constantSets[env]);

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
}

Object.freeze(Constants);
export default Constants;
