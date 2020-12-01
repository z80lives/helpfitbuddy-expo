import {APIService} from "./api.js";

export class Messaging extends APIService{
    getThreads(){
	return this.get(
	    ["gymuser", "friends"]
	);
    }
}
