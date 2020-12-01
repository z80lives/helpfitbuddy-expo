import {APIService} from "./api.js";

export class MessagingServices extends APIService{
    getThreads(){
	return this.get(
	    ["gymuser", "friends"],
	);
    }

    getMessageThread(recipient){	
	//gymuser/message/private/thread
	return this.post(
	    ["gymuser", "message", "private", "thread"],
	    {recipient}
	);
    }

    sendMessage(recipient, message){
	return this.post(
	    ["gymuser", "message", "private"],
	    {recipient, message}
	);
    }
}
