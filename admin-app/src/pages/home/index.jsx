import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { withDashboard } from '../../hoc';
import './styles.scss';

const DashboardPage = () => (
  <div>
    <Row>
      <Col>
        <div className="content-head">
          <h1>Recent Orders</h1>
        </div>
      </Col>
    </Row>
  </div>
);

export default withDashboard(DashboardPage);
