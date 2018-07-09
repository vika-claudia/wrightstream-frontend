// REACT
import React from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { getNewPurchases } from '../../actions/admin';

class CurrentPurchases extends React.Component {
  componentDidMount () {
    this.props.getNewPurchases();
  };


  render () {
    return (
      <div className="column is-4">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <span> {this.props.newPurchases} </span>
            </div>
          </div>
          <footer className="card-footer">
            New Purchases
          </footer>
        </div>
      </div>
    )}
  }

  const mapStateToProps = state => ({
    newPurchases: state.admin.newPurchases
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    getNewPurchases
  }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(CurrentPurchases);