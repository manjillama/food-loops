import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withDashboard } from '../../hoc';

const MenuPage = () => (
  <div>
    <Row>
      <Col>
        <div className="content-head">
          <h1>Menu</h1> <Link className="btn btn-primary">Add Dish</Link>
        </div>
      </Col>
    </Row>
  </div>
);

export default withDashboard(MenuPage);
