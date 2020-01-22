import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Login from './pages/Login';
import List from './pages/List';
import Request from './pages/Request';
import Home from './pages/Home';


const Routes = createAppContainer(
createSwitchNavigator({
    Login,
    List,
    Home,
    Request
})
);
export default Routes;



