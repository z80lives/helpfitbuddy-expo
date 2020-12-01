import {APIService} from "./api.js";

export class EventServices extends APIService{
    getEvents(){
	return this.get(
	    ["gymuser", "event"]
	);
    }
    
    getUserEvents(_id){
	return this.post(
	    ["gymuser", "event", "user"],	    
	    {"_id": _id}
	);	 
    }

    joinUserEvent(_id){
	return this.post(
	    ["gymuser", "event", "join"],
	    {_id}
	);
    }

    //localhost:5000/gymuser/event
    createEvent(name, date, time, gym, type){
	return this.post(
	    ["gymuser", "event"],
	    {name, date, time, gym, type, invite:"friends"}
	);
    }
}
