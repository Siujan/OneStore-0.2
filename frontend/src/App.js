import React, {useState, useEffect} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./components/Home"
import Main from "./components/Main"
import AuthenticationDataService from "./services/authentication"

function App() {  

  const [accountInfo,setAccountInfo] = useState(1);

  useEffect(()=>{
    getAuthenticated();
  },[])

  const getAuthenticated = () =>{
    AuthenticationDataService.getAuthenticatedUser()
        .then(res =>{
            setAccountInfo(res.data || 0); 
        }) 
        .catch(e =>{
            console.log(e)
        }) 
  }   

  return (
    <Switch>
      
      <Route exact path={["/","/home"]}>
        {accountInfo === 1 ? <div></div> : 
          (accountInfo === 0) ? 
            <Home accountInfo={accountInfo}/> : 
              <Redirect to="/main"/>}
      </Route>

      <Route path="/main">
        {accountInfo === 1 ? <div></div> : 
          (accountInfo === 0) ?
            <Redirect to ="/home" /> :
              <Main accountInfo={accountInfo}/>}
  
      </Route>

    </Switch>
  );
}

export default App;
