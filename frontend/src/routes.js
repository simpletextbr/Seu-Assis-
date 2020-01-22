import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Singin from './pages/Singin';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Dashboard/Detail';
import New from './pages/New';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/singin' component={Singin} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/detail' exact component={Detail} />
                <Route path='/new' component={New} />
            </Switch>
        </BrowserRouter>
    );
}
