import React, { Component } from 'react';

class FullBody extends Component {
  render() {
    return (
        <div className="container-fluid">
           <div className="col-md-12">
             <div className="col-md-6">
                <p>calculator</p>
             </div>
             <div className="col-md-6">
                <p>proof</p>
             </div>
           </div>
         </div>
      );
  }
}

export default FullBody;
