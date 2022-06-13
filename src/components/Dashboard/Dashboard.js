
import React, {useState, useEffect} from 'react';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import { Row, Col, Grid, Container } from 'react-bootstrap';
import LeftSide from '../Home/dashboard/LeftSide';
import { Card } from 'antd';


const Dashboard = (props) =>{
 
    return (
    <LeftSide mainsection={
    <React.Fragment>
        <div  style={{paddingTop:30, paddingBottom:30, paddingLeft:0, paddingRight:0}}>
          <Container >
        <Row>
            <Col sm={3}>
            <div className="site-card-border-less-wrapper">
            <Card title="Events" bordered={false} style={{ width: 300 }}>
     
            </Card>
            </div>
            </Col>

            <Col sm={3}>
            <div className="site-card-border-less-wrapper">
            <Card title="Services" bordered={false} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>
            </div>
            </Col>

            <Col sm={3}>
            <div className="site-card-border-less-wrapper">
            <Card title="Hospital" bordered={false} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>
            </div>
            </Col>

            <Col sm={3}>
            <div className="site-card-border-less-wrapper">
    <Card title="Doctors" bordered={false} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>
            </Col>
        </Row>
        </Container>
        </div>
    </React.Fragment>
    } />
        );
}
export default Dashboard;