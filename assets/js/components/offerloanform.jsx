import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


export default function OfferLoanForm(props) {

  let loans = _.map(props.requestedloans, (uu) => <option key={uu.id} value={uu.id}>{uu.id}</option>);

  return <div style={{padding: "4ex"}}>
    <h2>Offer Loan</h2>
    <FormGroup>
      <Label for="requestedloan_id">Lend to Loan ID</Label>
      <Input type="select" name="requestedloan_id">
       { loans }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="mini_balance">Minimum Balance:</Label>
      <Input type="number" name="mini_balance" />
    </FormGroup>
    <FormGroup>
      <Label for="colletaral">Colletaral:</Label>
      <Input type="number" name="colletaral" />
    </FormGroup>

    <Button onClick={() => alert("TODO: Submit Notification")}>Offer Loan</Button>
</div>;


}
