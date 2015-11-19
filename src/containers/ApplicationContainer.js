import React from 'react';
import { connect } from 'react-redux';

export class ApplicationContainer extends React.Component {
  render() {
    return <h1>youtube-search</h1>;
  }
}

export default connect(state => state)(ApplicationContainer);
