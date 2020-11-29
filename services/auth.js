import {APIService} from "./api.js"
import {auth} from "../redux/actions/auth";

export class AuthService extends APIService{
    login(username, password){
	return this.post(
	    ["user", "login"],
	    {username: username, password: password}
	);
    }

    register(name, username, password, dob, type, country, occupation, bio){
		return this.post(
			["user", "register"],
			{name, username, password, dob, type, country, occupation, bio}
		);
    }

    refreshTokens(){
	const token = this.getToken();
	if(token != null){
	    this.get(["login", "refresh"]).then(response => {
		console.log("refreshing token");
		this.getReduxStore().dispatch(auth.refreshAction(response.token));
	    });
	}
    }

    loginState(){
	return this.get(
	    ["login", "state"]
	);
    }

}
