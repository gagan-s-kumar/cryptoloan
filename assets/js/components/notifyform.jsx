import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


export default function NotifyForm(props) {

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);

  return <div style={{padding: "4ex"}}>
    <h2>New Post</h2>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="select" name="user_id">
       { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="bclimit">Alert Limit:</Label>
      <Input type="number" name="bclimit" />
    </FormGroup>

    <FormGroup>
      <Label for="lclimit">Alert Limit:</Label>
      <Input type="number" name="lclimit" />
    </FormGroup>

    <FormGroup>
      <Label for="etlimit">Alert Limit:</Label>
      <Input type="number" name="etlimit" />
    </FormGroup>
    <Button onClick={() => alert("TODO: Submit Notification")}>Submit</Button>
</div>;


}
