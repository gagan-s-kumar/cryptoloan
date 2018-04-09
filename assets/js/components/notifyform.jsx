import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


export default function NotifyForm(props) {

  return <div style={{padding: "4ex"}}>
    <h2>New Post</h2>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="text" name="user_id">
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="bitcoin">Bitcoin:</Label>
      <Input type="button" name="bitcoin" value="subcribe"/>
    </FormGroup>
    <FormGroup>
      <Label for="bclimit">Alert Limit:</Label>
      <Input type="number" name="bclimit" />
    </FormGroup>

    <FormGroup>
      <Label for="litecoin">Litecoin:</Label>
      <Input type="button" name="litecoin" value="subcribe"/>
    </FormGroup>
    <FormGroup>
      <Label for="lclimit">Alert Limit:</Label>
      <Input type="number" name="lclimit" />
    </FormGroup>

    <FormGroup>
      <Label for="ethereum">Ethereum:</Label>
      <Input type="button" name="ethereum" value="subcribe"/>
    </FormGroup>
    <FormGroup>
      <Label for="etlimit">Alert Limit:</Label>
      <Input type="number" name="etlimit" />
    </FormGroup>
    <Button onClick={() => alert("TODO: Submit Notification")}>Submit</Button>
</div>;


}
