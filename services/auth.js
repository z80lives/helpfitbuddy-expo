import {APIService} from "./api.js"


export class AuthService extends APIService{
    login(username, password){
	return this.post(
	    ["user", "login"],
	    {username: username, password: password}
	);
    }

    loginState(){
	return this.get(
	    ["login", "state"]
	);
    }
}
