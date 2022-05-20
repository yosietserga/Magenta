import * as React from "react";
//local storgae for cache
import storage from "node-persist";

//state manager
import Freezer from "freezer-js";

//TODO:import common utils ucfirst 
String.prototype.ucfirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const store = new Freezer({});

if (typeof fs !== "undefined") {
  storage.init({
    dir: "./tmp",
  });
}

const __get = (k) => {
  if (typeof fs !== "undefined") {
    return false;
  }

  return storage.getItem(k);
};

const __set = (k, v) => {
  if (typeof fs !== "undefined") {
    return false;
  }

  storage.setItem(k, v);
};

const __delete = (k, v) => {
  if (typeof fs !== "undefined") {
    return false;
  }

  storage.removeItem(k);
};

const StoreContext = React.createContext(store);

const StoreProvider = ({ children }) => {
  store.on("beforeAll", (eventName, state)=>{
    //console.log("Store::beforeAll", eventName, state);
  });
  
  store.on("afterAll", (eventName, state)=>{
    //console.log("Store::afterAll", eventName, state);
    //TODO: set caching controls and api updates
    /*
    let cruds = eventName.split(":");
    if (
      cruds.length>1 //has the convention name
      && !!cruds[1] //has a boolean value for the second arg
      && ["create","update","delete"].includes(cruds[1]) //has a valid action
      ) {
        let endpoint = "/api" + cruds[0].toLowerCase();
        switch (cruds[1].toLowerCase()) {
          case "create":
            fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                //TODO:helper function to get and normalize model data 
                //App[`model${cruds[0].ucfirst()}`].formData( state )
              ),
            });
            break;
        }
      }
    
    //upsert cache 
    storage.setItem(eventName, state);
    */
  });

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider, store };