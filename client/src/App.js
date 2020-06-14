import React from 'react';
import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionList } from './components/TransactionList'
import { AddTransaction } from './components/AddTransaction'
import { Home } from './components/Home';

import { GlobalProvider } from './context/GlobalState'
//import { loadUser } from './actions/authActions';

import './App.css';

function App()  {

  //componentDidMount()  {
    //store.dispatch(loadUser());
  //}

  return (
    <GlobalProvider>
      <Home />
     <Header />
     <div className = "container">
       <Balance />
       <IncomeExpenses />
       <TransactionList />
       <AddTransaction />
     </div>
    </GlobalProvider>
  );
}


export default App;

///export
