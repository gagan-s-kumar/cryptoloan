import React from 'react';

function ShowLoans(props) {

  return <div>
    <p>{props.loan.mini_balance}</p>
  </div>;

}


export default function Loans(props) {

  let loanList = _.map(props.loans, (nn) => <ShowLoans key={nn.id} loan={nn} />);

  return <div>
    <h2>List of Loans</h2>
    { loanList }
</div>;

}
