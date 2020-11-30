import {APIService} from "./api.js";

export class FriendServices extends APIService{
    getFriendList(){
	return this.get(
	    ["gymuser", "friends"]
	);
    }

    getFriendRequests(){
	return this.get(
	    ["gymuser", "requests"]
	);
    }

    sendFriendRequest(_id){
	console.log("ID is ", _id);
	return this.post(
	    ["gymuser", "request"],
	    {_id}
	);
    }

    acceptFriendRequest(_id){
	return this.post(
	    ["gymuser", "request", "accept"],
	    {_id}
	)
    }

    rejecttFriendRequest(_id){
	return this.post(
	    ["gymuser", "request", "reject"],
	    {_id}
	)
    }    
}
