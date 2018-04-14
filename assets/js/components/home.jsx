import React from 'react';
import { Link, Button } from 'reactstrap';
import Notifylist from './notifylist';

import api from './api';

import { LineChart } from 'react-easy-chart';


export default function HomePage(props) {
  let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  let g = props.graph;
  let gmap = _.map(g,function (v){ let date = new Date(v.time * 1000);
                                  let a = date.getDate()+'-'+monthNames[date.getMonth()];
                                  return {x: a, y: v.open}});

  return <div>
    <div>

    <LineChart
    axes
    grid
    xType={'text'}
    axisLabels = {{x: 'Date', y: 'Rate'}}
    width={1000}
    height={500}
    data={[gmap]}
    />

    </div>
    <div>
      <Notifylist notify={props.notify} />
    </div>
  </div>;
}
