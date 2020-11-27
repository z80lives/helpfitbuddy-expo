import {APIService} from "./api.js"


export class AuthService extends APIService{
    login(username, password){
	return this.post(
	    ["user", "login"],
	    {username: username, password: password}
	);
    }

    register(name, username, password, dob, type){
	return this.post(
	    ["user", "register"],
	    {name, username, password, dob, type}
	);
    }

    loginState(){
	return this.get(
	    ["login", "state"]
	);
    }

}
