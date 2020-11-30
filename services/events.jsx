import {APIService} from "./api.js";

export class EventServices extends APIService{
    getEvents(){
	return this.get(
	    ["gymuser", "event"]
	);
    }
}
