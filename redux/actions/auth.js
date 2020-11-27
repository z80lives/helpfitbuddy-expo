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

const setProfilePictureAction = (img) => ({
    type: "SET_PROFILE_PICTURE",
    payload: {
	image: img
    }
})

export const auth = {
    loginAction,
    logoutAction,
    setActivitiesAction,
    setProfilePictureAction
};

export default auth;
