import React, {useState} from "react"
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
  } from "react-router-dom";
import '../css/main.css';
import Navbar from './MainComponents/Navbar'
import Inventory from './MainComponents/Inventory'
import Account from './MainComponents/Account'
import Order from './MainComponents/Order'
import Business from './MainComponents/Business'

const Main = (props) =>{
    
    let { path, url } = useRouteMatch();

    return(
        <div id="main">
            <Navbar />
            <div className="main-content">
                <Switch>
                    <Route exact path={[path]}>
                        <Redirect to ="/main/inventory" />
                    </Route>
                    <Route path={[`${path}/inventory`]} >
                        <Inventory accId={props.accountInfo._id}/>
                    </Route>
                    <Route path={[`${path}/order`]} >
                        <Order />
                    </Route>
                    <Route path={[`${path}/business`]} >
                        <Business />
                    </Route>
                    <Route path={[`${path}/account`]}>
                        <Account accountInfo={props.accountInfo}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )        
}

export default Main;