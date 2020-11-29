import store from '../redux/store';

export class APIService{
	host = "http://192.168.1.9:5000";    //testing
	//host = "https://z80lives.net:5000";  //production
    token = null;
    
    setToken(token){
	//console.log("Set Token", token);
	this.token = token;
    }

    getToken(){
	//console.log("STORE TOKEN", store.getState().authReducer.token);
	const storedToken = store.getState().authReducer.token;
	if(storedToken != null)
	    return storedToken;
	return this.token;
    }

    getReduxStore(){
	return store;
    }

    getHeader(){
	return {
	    "Content-Type": "application/json"
	};
    }

    getActions(actions){
	return [this.host, actions.join("/")].join("/");
    }

    post(actions, body){
	return this.request(actions, body, "POST");
    }

    get(actions){
	return this.request(actions, null, "GET");
    }
    
    request(actions, body, method){	
	const params = {
	    "method": method,
	    "headers": this.getHeader()
	};
	if(this.token == null){
	    this.setToken(store.getState().authReducer.token);
	}
	if(body){
	    params["body"] = JSON.stringify(body);
	}
	if(this.token){
	    params["headers"]["Authorization"] = "Bearer "+this.token;	    
	}

	const promise =
	      (resolve, reject) => {
		  fetch(	    
		      this.getActions(actions),
		      params
		  ).then(async r => {
		      if(r.ok){			  
			  resolve(r.json());
		      }else{
			  try{
			      const body = await r.json();
			      if(body.message){
				  reject(body.message);
			      }else{
				  reject(body);
			      }
			  }catch(ex){
			      reject("No JSON Object received. Code "+r.status, new Error("HTTP Response code "+r.status), r);
			  }
		      }
		      return r;
		  }).catch( (error) => {
		      console.log("HTTP Exception:", error);
		      console.log("host", this.host);
		      console.log("action", actions);
		      reject("HTTP API Exception occured"+error);
		  });
	      };
	return new Promise(promise);
    }
    
    getHost(){
	return this.host;
    }
}
