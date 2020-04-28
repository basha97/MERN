import React from 'react';
import "../styles.css";
import { API } from "../backend";
import Base from './Base';

function Home() {
  console.log('Api is', API);
    return (
        <Base title="Home Page">
          <div className="row">
            <div className="col-4">
              <button className="btn btn-success">Test</button>
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
          </div> 
        </Base>
    );
}

export default Home;