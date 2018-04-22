import React from 'react';
import { Button, FormGroup, Label, Input, Card, CardTitle, CardBody, CardText, CardSubtitle } from 'reactstrap';
import {Redirect} from 'react-router-dom';

export default function Userlist(props) {
  if(props.users==false)
	return <Redirect to="/" />;

  let user = _.find(props.users, (nn) => nn.id==props.token.user_id);
 // let wallet = _.find(props.wallets, (ww) => ww.user.id==props.token.user_id);
  let wallet = props.wallet;
  let wallet_info=0;
  if(wallet)
    wallet_info = wallet.data.balance;
  return <div>
	      <p>Name: {user.name}</p>
	      <p>Email: {user.email}</p>
	      <Card>
		<CardBody>
		  <CardTitle>Wallet Information</CardTitle>
		  <CardText>Bitcoin Balance: BTC {wallet_info} </CardText>
		</CardBody>
	      </Card>
              <Card>
		<CardBody>
		  <CardTitle>Account Information</CardTitle>
        <CardText>Amount Balance</CardText>
  		  <CardText>${user.debit}</CardText>
		  <CardText>Amount Borrowed</CardText>
		  <CardText>${user.credit}</CardText>
		</CardBody>
	      </Card>
	</div>;
}
