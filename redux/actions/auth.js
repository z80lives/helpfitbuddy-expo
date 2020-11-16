export const loginAction = (user) => ({
  type: 'LOGIN',
  payload: {
    user: user,
  },
});

const logoutAction = () => ({
    type: "LOGOUT",
    payload: {}
});


export const auth = {
    loginAction,
    logoutAction
};

export default auth;
