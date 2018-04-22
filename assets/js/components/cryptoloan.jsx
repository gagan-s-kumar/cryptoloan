import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Cookies from 'universal-cookie';

import Nav from './nav';
import HomePage from './home';
import Loans from './loans';
import ApprovedLoans from './approvedloans';
import Requestloans from './requested-loans';
import NotifyForm from './notifyform';
import EditNotifyForm from './edit-notify-form';
import RequestLoanForm from './requestloanform';
import OfferLoanForm from './offerloanform';
import Notifylist from './notifylist';
import Userlist from './userlist';
import UserForm from './registration-form';
import Nav2 from './nav2'
import api from './api';
import LoansNav from './loan-nav';

export default function cryptoloan_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <Cryptoloan />
      </Provider>,
      root);
}

let Cryptoloan = connect((state) => state)((props) => {

  let cookies = new Cookies();
  if(cookies.get('token')){
  return (
    <Router>
      <div>
        <Nav2 />
          <Route path="/" exact={true} render={() =>
            <div>
              <div className="errors">{props.errors}</div>
              <HomePage notify={props.notifications} graph={props.graph} token={props.token} bitcoin={props.bitcoin} litecoin={props.litecoin} ethereum={props.ethereum}/>
            </div>
          } />

        <Route path="/loans" exact={true} render={() =>
            <div>
              <LoansNav />
              <div className="errors">{props.errors}</div>
              <Loans loans={props.loans} token={props.token} wallet={props.wallet} bitcoin={props.bitcoin}/>
            </div>
          } />

        <Route path="/notifications" exact={true} render={() =>
            <div>
              <div className="errors">{props.errors}</div>
              <NotifyForm users={props.users} token={props.token}/>
              <Notifylist notify={props.notifications} token={props.token}/>
            </div>
          } />

        <Route path="/editnotifications/:id" exact={true} render={({match}) =>
              <div>
                <div className="errors">{props.errors}</div>
                <EditNotifyForm users={props.users} token={props.token} task={_.find(props.notifications, (pp) => match.params.id == pp.id )}/>
              </div>
            } />

      <Route path="/offeredloan/:id" exact={true} render={({match}) =>
                <div>
                  <LoansNav />
                  <div className="errors">{props.errors}</div>
                  <OfferLoanForm requestedloans={props.requestedloans} token={props.token} re1={_.find(props.requestedloans, (yy) => match.params.id == yy.id)} wallet={props.wallet} />
                  </div>
                } />

        <Route path="/users" exact={true} render={() =>
            <div>

              <div className="errors">{props.errors}</div>
              <Userlist users={props.users} token={props.token} wallet={props.wallet} />
            </div>
          } />

        <Route path="/approvedloans" exact={true} render={() =>
              <div>
                <LoansNav />
                <div className="errors">{props.errors}</div>
                <ApprovedLoans loans={props.loans} token={props.token}/>
              </div>
            } />

        <Route path="/requestedloans" exact={true} render={() =>
              <div>
                <LoansNav />
               <div className="errors">{props.errors}</div>
                <RequestLoanForm user={_.find(props.users, (uu) => uu.id==props.token.user_id )} token={props.token} wallet={props.wallet} bitcoin={props.bitcoin} />
                <Requestloans ln={props.requestedloans} token={props.token} user={_.find(props.users, (uu) => uu.id==props.token.user_id )}/>
              </div>
            } />

      </div>
    </Router>
  );
  }
  else {
   return (
    <Router>
      <div>
        <Nav/>
        <div className="errors">{props.errors}</div>
        <UserForm />
      </div>
   </Router>
  );
}

});
