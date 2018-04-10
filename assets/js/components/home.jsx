import React from 'react';
import { Link, Button } from 'reactstrap';
import Notifylist from './notifylist';


export default function HomePage(props) {
  console.log("home page");
  console.log("props", props);
  return <div>
    <div>
      <p>Graph Part: TODO </p>
    </div>
    <div>
      <Notifylist notify={props.notify} />
    </div>
  </div>;
}
