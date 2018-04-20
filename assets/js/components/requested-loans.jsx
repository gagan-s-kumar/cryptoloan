import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

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

function Show(props) {
  if(!props.status && (props.id != props.token.user_id)) {
    return <td>
            <Link to={"/offeredloan/"+props.rid}><Button color="primary">Offer Loan</Button></Link>
           </td>;
  } else {
    return <td>
          </td>;
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
           {props.req.amount}
        </td>
        <td>
           {props.req.duration_requested}
        </td>
           <Status status={props.req.granted} />
           <Show status={props.req.granted} rid={props.req.id} token={props.token} id={props.req.user_id.id}/>
  </tr>;

}


export default function Requestloans(props) {

  let req1 = _.map(props.ln, (nn) => <ShowRequests key={nn.id} req={nn} token={props.token}/>);

  return <div>
    <h2>All Requested Loans</h2>
            <table className="data">
              <tbody>
              <tr>
                <th>
                 Request ID
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
