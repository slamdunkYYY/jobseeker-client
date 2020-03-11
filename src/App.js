import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import store from './redux/store.js'
import Login from './containers/login/login'
import Main from './containers/main/main'
import Register from './containers/register/register'


class App extends Component {
  render() {
    return (
        <Provider store={store}>
         	<BrowserRouter>
         		<Switch>
         			<Route path="/login" component={Login}/>
         			<Route path="/register" component={Register}/>
         			<Route component={Main}/>
         		</Switch>  			
         	</BrowserRouter>
        </Provider>
    )
  }
}

export default App;
