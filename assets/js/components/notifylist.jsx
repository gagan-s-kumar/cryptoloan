import React from 'react';

function ShowNotifications(props) {

  return <div>
    <p>{props.note.bclimit}</p>
  </div>;

}


export default function Notifylist(props) {
  console.log("notify list:",props);
  let notifyList = _.map(props.notify, (nn) => <ShowNotifications key={nn.id} note={nn} />);

  //console.log("after", notifyList);

  return <div>
      <h2>Your Notifications</h2>
      {notifyList}
    </div>;

}
