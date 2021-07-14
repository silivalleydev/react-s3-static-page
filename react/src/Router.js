import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import MainPage from './components/mainPage';

const Router = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route component={MainPage}/>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;