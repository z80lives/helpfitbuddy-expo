const initialState = {
    ownedGym: null
};

const gymReducer = (state = initialState, {type, payload}) =>{
    switch (type){
    case "SET_USER_GYM":
	return {...state, ownedGym: payload.ownedGym};
    default:
	return state;
    }
    
};

export default gymReducer;
