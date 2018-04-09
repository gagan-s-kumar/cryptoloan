import React from 'react';

function ShowRequests(props) {

  return <div>
    <p>{props.req}</p>
  </div>;

}


export default function Requestloans(props) {

  let req1 = _.map(props.ln, (nn) => <ShowRequests key={nn.id} req={nn} />);

  return <div>
    <h2>Loan Requests</h2>
    { req1 }
    </div>;

}
