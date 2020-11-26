export const loginAction = (user, token) => ({
  type: 'LOGIN',
  payload: {
      user: user,
      token: token
  },
});

const logoutAction = () => ({
    type: "LOGOUT",
    payload: {}
});

const setActivitiesAction = (activities) => ({
    type: "UPDATE_ACTIVITIES",
    payload: {
	activities: activities
    }
});

export const auth = {
    loginAction,
    logoutAction,
    setActivitiesAction
};

export default auth;
