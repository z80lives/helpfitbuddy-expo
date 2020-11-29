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

    setProfilePicture(image){
	return this.post(
	    ["gymuser", "profile_picture"],
	    {
		base64: image
	    }
	);
    }

    getProfilePicture(){
	return this.get(
	    ["gymuser","profile_picture"]
	);
    }

    getNeighbors(){
	return this.get(
	    ["gymuser","neighbors"]
	);
	}
	
	getGymList(){
		return this.get(
			["gym"]
		)
	}
    
    setActivities(activities){
		console.log("Token", this.getToken());
		return this.post(
			["gymuser", "activities"],
			{activities}
		);
    }
}
