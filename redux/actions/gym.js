export const setUserGym = (gym) => ({
    type: "SET_USER_GYM",
    payload: {
	ownedGym: gym
    }
});

export default {
    setUserGym
};
