import {APIService} from "./api.js";

export class GymUserService extends APIService{
    getActivities(){
	return this.get(
	    ["gymuser", "activities"]
	);
    }
    
    getUser(){
	return this.get(
	    ["login", "state"]
	);
    }

    setActivities(activities){
	console.log("Token", this.getToken());
	return this.post(
	    ["gymuser", "activities"],
	    {activities}
	);
    }
}
