import {APIService} from "./api.js";

export class EventServices extends APIService{
    getEvents(){
	return this.get(
	    ["gymuser", "event"]
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
