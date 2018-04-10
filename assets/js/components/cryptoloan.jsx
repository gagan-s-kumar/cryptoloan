import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import HomePage from './home';
import Loans from './loans';
import Requestloans from './requested-loans';
import NotifyForm from './notifyform';

export default function cryptoloan_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Cryptoloan />, root);
}

class Cryptoloan extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      notifications: [],
      loans: [],
      requestedloans: [],
      users: []
    };

    this.request_notifications();
    this.request_loans();
    this.request_requestedloans();
    this.request_users();

    console.log(this.state);
  }

  request_loans() {
    $.ajax("/api/v1/loans", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("loans:", resp.data);
        this.setState(_.extend(this.state, { loans: resp.data }));
      },
    });
  }

  request_notifications() {
    $.ajax("/api/v1/notification", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("notify", resp.data);
        this.setState(_.extend(this.state, { notifications: resp.data }));
      },
    });
  }

  request_requestedloans() {
    $.ajax("/api/v1/requestedloans", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("req loans:", resp.data);
        this.setState(_.extend(this.state, { requestedloans: resp.data }));
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log("req loans:", resp.data);
        this.setState(_.extend(this.state, { users: resp.data }));
      },
    });
  }

  render(){
    console.log("this", this);
    return (
      <Router>
        <div>
          <Nav/>

            <Route path="/" extact={true} render={() =>
              <div>
                <NotifyForm users={this.state.users}/>
                <HomePage notify={this.state.notifications}/>
              </div>
            } />

          <Route path="/loans" extact={true} render={() =>
              <div>
                <Loans loans={this.state.loans}/>
              </div>
            } />

          <Route path="/requestedloans" extact={true} render={() =>
                <div>
                  <Requestloans ln={this.state.requestedloans}/>
                </div>
              } />


        </div>
      </Router>
    );
  }

}
