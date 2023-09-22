import React from 'react';
import { verifyAccessToken } from './common/function/commonFunction';
import Router from './Router';

const App = (props) => {

    React.useEffect(() => {
        verifyAccessToken();
    }, [])

    return (
        <>
            <Router />
        </>
    )
};

export default App;