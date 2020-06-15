import React from 'react';
import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionList } from './components/TransactionList'
import { AddTransaction } from './components/AddTransaction'
import { Home } from './components/Home';

import { GlobalProvider } from './context/GlobalState'
import {
  BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//import { loadUser } from './actions/authActions';

import './App.css';

function App()  {

  //componentDidMount()  {
    //store.dispatch(loadUser());
  //}

  return (
    <GlobalProvider>
    <Router className = "router">
      <div className = "navbar">
        <Link to ="/">Home ||</Link>
        <Link to ="/expenses">Expenses</Link>
        </div>
        <Switch>
          <Route exact path = "/">
          <Home />
          </Route>
          <Route exact path = "/expenses">
          <Header />
       <Balance />
       <IncomeExpenses />
       <TransactionList />
       <AddTransaction />
          </Route>
        </Switch>
    </Router>
    </GlobalProvider>
  );
}


export default App;

///export
