// REACT
import React from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPurchaseStatuses } from '../../../../../../state/actions/admin';

// CHART
import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);

// ==========

class CurrentPurchasesStatus extends React.Component {
  transformData = () => {
    const a = Object.keys(this.props.purchaseStatus);
    return a.reduce((acc,ele) => {
      acc[this.props.purchaseStatus[ele].name] = this.props.purchaseStatus[ele].statusCount;
      return acc;
    },{});
  };

  componentDidMount () {
    this.props.getPurchaseStatuses();
  };

  render () {
    return (
      <div className="column">
        <div className="card">
          <header className="card-header">
            Current Purchase Statuses
          </header>
          <div className="card-content">
            <div className="content">
              <div>
                <PieChart donut={true} data={this.transformData()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  purchaseStatus: state.admin.purchaseStatus
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPurchaseStatuses
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPurchasesStatus);
