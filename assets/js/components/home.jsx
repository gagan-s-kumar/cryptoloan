import React from 'react';
import { Link, Button } from 'reactstrap';
import api from './api';
import Notifylist from './notifylist';
import { LineChart } from 'react-easy-chart';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';

export default function HomePage(props) {
  console.log("IN HOME JSX ..", window.location.href);
  let ltc, eth, btc;

  _.each(props.graph, function(obj){
	if(_.has(obj, 'ltc')) ltc=obj.ltc;
	else if(_.has(obj, 'eth')) eth=obj.eth;
	else btc=obj.btc;});

  let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  let ltc_gmap = _.map(ltc,function (v){ let date = new Date(v.time * 1000);
                                  let a = date.getDate()+'-'+monthNames[date.getMonth()];
                                  return {x: a, y: v.open}});
  let eth_gmap = _.map(eth,function (v){ let date = new Date(v.time * 1000);
                                  let a = date.getDate()+'-'+monthNames[date.getMonth()];
                                  return {x: a, y: v.open}});
  let btc_gmap = _.map(btc,function (v){ let date = new Date(v.time * 1000);
                                  let a = date.getDate()+'-'+monthNames[date.getMonth()];
                                  return {x: a, y: v.open}});
  return <div>
       <Tabs>
    <TabList className="nav nav-tabs">
      <Tab className="btn btn-info">Bitcoin</Tab>
      <Tab className="btn btn-info">Ethereum</Tab>
      <Tab className="btn btn-info">Litecoin</Tab>
    </TabList>

    <TabPanel>
    <div>
	BITCOIN
    <LineChart
    axes
    margin={{top: 10, right: 20, bottom: 50, left: 50}}
    grid
    verticalGrid
    xType={'text'}
    axisLabels = {{x: 'Date', y: 'Rate'}}
    lineColors={['gold']}
    width={1000}
    height={500}
    data={[btc_gmap]}
    />

    </div>
    </TabPanel>
    <TabPanel>
    <div>
	ETHERIUM
    <LineChart
    axes
    margin={{top: 10, right: 20, bottom: 50, left: 50}}
    grid
    verticalGrid
    xType={'text'}
    lineColors={['blue']}
    axisLabels = {{x: 'Date', y: 'Rate'}}
    width={1000}
    height={500}
    data={[eth_gmap]}
    />

    </div>
    </TabPanel>
    <TabPanel>
    <div>
	LITECOIN
    <LineChart
    axes
    margin={{top: 10, right: 20, bottom: 50, left: 50}}
    grid
    verticalGrid
    xType={'text'}
    lineColors={['green']}
    axisLabels = {{x: 'Date', y: 'Rate'}}
    width={1000}
    height={500}
    data={[ltc_gmap]}
    />

    </div>
   </TabPanel>
  </Tabs>


  </div>;
}
