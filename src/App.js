import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Topbar from './components/Topbar'
import Restaurants from './components/Restaurants'
import Menu from './components/Menu'
import PrivateRoute from './components/PrivateRoute'
import ProtectedPage from './components/ProtectedPage'
import Login from  './components/Login'

function App() {
  return (
    <BrowserRouter>
      <div className="App">   
        <Topbar />

        <Switch>
            <Route exact path="/" component={Restaurants}/>
            <Route path="/login" component={Login}/>
            <Route path="/menu" component={Menu}/>            
            <PrivateRoute path="/protected" component={ProtectedPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
