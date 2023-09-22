import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import SignInPage from './components/auth/signInPage';
import SignUpPage from './components/auth/signUpPage';
import MainPage from './components/mainPage';
import Navigation from './components/navigation';

const Router = (props) => {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/signIn" component={SignInPage}/>
                <Route exact path="/signUp" component={SignUpPage}/>
                <Route component={MainPage}/>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;