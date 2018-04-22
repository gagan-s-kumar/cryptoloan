import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import api from './api';

function Status(props) {
  if(props.status) {
    return <td>
             Granted
           </td>;
  } else {
    return <td>
            Pending
          </td>;
  }
}

function delete_request(user, req_id){
   api.delete_requestedloan(user, req_id);  
}

function Show(props) {
  if(!props.status && (props.id != props.token.user_id)) {

     if(props.user.debit < props.req.amount)
      return <td>Low Balance</td>;
    return <td>
            <Link to={"/offeredloan/"+props.req.id}><Button color="primary">Offer Loan</Button></Link>
           </td>;
  } else if(!props.status){
    return <td>
	    <Button color="danger" onClick={() => delete_request(props.user.id, props.req.id)}>Delete</Button>
          </td>;
  }
  else {
    return <td></td>;
  }
}


function ShowRequests(props) {

  //return <div>
  //  <p>{props.req.amount}</p>
  //</div>;

  return <tr>
        <td>
           {props.req.id}
        </td>
        <td>
           {props.req.user_id.name}
        </td>
        <td>
           {props.req.amount}
        </td>
        <td>
           {props.req.duration_requested}
        </td>
           <Status status={props.req.granted} />
           <Show status={props.req.granted} req={props.req} token={props.token} id={props.req.user_id.id} user={props.user}/>
  </tr>;

}


export default function Requestloans(props) {

  if(!props.user){
  return <Redirect to="/" />;
}
  let req1 = _.map(props.ln, (nn) => <ShowRequests key={nn.id} req={nn} token={props.token} user={props.user} />);
  return <div>
    <h2>All Requested Loans</h2>
            <table className="data">
              <tbody>
              <tr>
                <th>
                 Request ID
               </th>
                <th>
                 Requester Name
               </th>
              <th>
                 Amount
              </th>
              <th>
                 Duration Requested
              </th>
              <th>
                 Status
              </th>
              <th>
                Action
              </th>
            </tr>
            { req1 }
        </tbody>
      </table>
    </div>;

}
