import React from 'react';
import ReactDOM from 'react-dom';


export default function cryptoloan_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Cryptoloan />, root);
}

class Cryptoloan extends React.Component {

  render(){
    return (
      <div>
        REACT IS RENDERING!!!
      </div>
    )
  }

}
