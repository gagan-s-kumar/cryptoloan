import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import HomePage from './home';
import Loans from './loans';
import ApprovedLoans from './approvedloans';
import Requestloans from './requested-loans';
import NotifyForm from './notifyform';
import RequestLoanForm from './requestloanform';
import OfferLoanForm from './offerloanform';
import CurrentPrice from './current-price'

export default function cryptoloan_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <Cryptoloan />
      </Provider>,
      root);
}

let Cryptoloan = connect((state) => state)((props) => {

  return (
    <Router>
      <div>
        <Nav/>

          <Route path="/" exact={true} render={() =>
            <div>
              <CurrentPrice bitcoin={props.bitcoin}/>
              <NotifyForm users={props.users}/>
              <HomePage notify={props.notifications} graph={props.graph}/>
            </div>
          } />

        <Route path="/loans" exact={true} render={() =>
            <div>
              <Loans loans={props.loans}/>
            </div>
          } />

        <Route path="/approvedloans" exact={true} render={() =>
              <div>
                <ApprovedLoans loans={props.loans}/>
              </div>
            } />

        <Route path="/requestedloans" exact={true} render={() =>
              <div>
                <RequestLoanForm users={props.users}/>
                <OfferLoanForm users={props.requestedloans}/>
                <Requestloans ln={props.requestedloans}/>
              </div>
            } />

      </div>
    </Router>
  );

});
