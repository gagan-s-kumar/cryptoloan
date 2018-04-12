import React from 'react';
import { Link, Button } from 'reactstrap';
import Notifylist from './notifylist';
import api from '../api';

export default function HomePage(props) {
  console.log("home page");
  console.log("props", props);

  function test_token(ev) {
    let data = {};
    data.grant_type = "authorization_code";
    data.code = "bf8fb7e57c0e4171324430f53d3251d01462c7d40a2a963d0810120c514d104c";
    data.client_id = "80d081fbb195a4edc41aedc8f18bfd4454b0fe8eddd176741d46ee01b7f2c6f6";
    data.client_secret = "2e3c50382ed9885d1f7b9c421cce1ab1218a6ed2ca0dd4cd3fd83e4ff2b7827d";
    data.redirect_uri = "http://demo.purneshdixit.stream/auth/coinbase/callback";
    api.test_token(data);
  }

  return <div>
    <div>
      <p>Graph Part: TODO </p>
      <Button className="btn btn-primary" onClick={test_token}>Get token</Button>
    </div>
    <div>
      <Notifylist notify={props.notify} />
    </div>
  </div>;
}
