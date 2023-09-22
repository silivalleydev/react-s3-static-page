import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from './container';

const Navigation = (props) => {

    return (
        <Container {...props} />           
    )
};

export default withRouter(Navigation);