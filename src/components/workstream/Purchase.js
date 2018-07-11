// REACT
import React from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeStatus, assignStaff } from '../../actions/workstream';

// COMPONENTS
import PurchaseStatus from './PurchaseStatus';
import PurchasePhoto from './PurchasePhoto';
import PurchaseProgress from './PurchaseProgress';
import PurchaseIcon from './PurchaseIcon';
import PurchaseAction from './PurchaseAction';
import PurchaseModal from './PurchaseModal';
import PurchaseAssign from './PurchaseAssign';

// ==========

class Purchase extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalClasses: 'modal',
      assign: false,
      assignClasses: 'modal'
    };
  };

  toggle = () => {
    if (!this.state.modal) {
      this.setState({
        modal: true,
        modalClasses: this.state.modalClasses + ' is-active'
      });
    } else {
      this.setState({
        modal: false,
        modalClasses: 'modal'
      });
    }
  };

  assign = () => {
    if (!this.state.assign) {
      this.setState({
        assign: true,
        assignClasses: this.state.assignClasses + ' is-active'
      });
    } else {
      this.setState({
        assign: false,
        assignClasses: 'modal'
      });
    }
  };

  assignStaff = (id = null) => {
    this.props.assignStaff(this.props.purchase.id, id);
  };

  changeStatus = (status, completed, staff) => {
    this.props.changeStatus(this.props.purchase.id, status, completed, staff);
  };

  render () {
    return (
      <div>
        <div className="card">
          <PurchaseStatus purchase={this.props.purchase} text={false} />
          <div className="card-content">
            <div className="content">
              <div className="columns is-marginless">
                <div className="column is-2">
                  <div className="store-logo">
                    C
                  </div>
                </div>
                <div className="column is-6">
                  <div className="purchase-progress">
                    <a onClick={this.toggle}>Purchase #{this.props.purchase.id}</a>
                    <PurchaseProgress
                      purchase={this.props.purchase}
                      progress={
                        (() => {
                          if (this.props.purchase.statuses.find(status => status.status_id === 1).completed === false) {
                            return 'supplies';
                          } else if (this.props.purchase.statuses.find(status => status.status_id === 1).completed === true && this.props.purchase.statuses.find(status => status.status_id === 3).completed === false) {
                            return 'products';
                          }
                        })()
                      }
                    />
                  </div>
                </div>
                <div className="column is-2 purchase-profile">
                  <PurchasePhoto
                    purchase={this.props.purchase}
                    staff={this.props.staff}
                    user={this.props.user}
                    changeStatus={this.changeStatus}
                    assign={this.assign}
                    assignStaff={this.assignStaff}
                  />
                </div>
                <div className="column is-2 purchase-drag">
                  <PurchaseIcon purchase={this.props.purchase} />
                </div>
              </div>
            </div>
          </div>
          <PurchaseAction purchase={this.props.purchase} />
        </div>
        <div className={this.state.modalClasses}>
          <div className="modal-background" onClick={this.toggle}></div>
          <PurchaseModal
            purchase={this.props.purchase}
            staff={this.props.staff}
            user={this.props.user}
            changeStatus={this.changeStatus}
            assign={this.assign}
            assignStaff={this.assignStaff}
          />
          <button className="modal-close is-large" onClick={this.toggle}></button>
        </div>
        <div className={this.state.assignClasses}>
          <div className="modal-background" onClick={this.assign}></div>
          <PurchaseAssign
            purchase={this.props.purchase}
            staff={this.props.staff}
            assign={this.assign}
            assignStaff={this.assignStaff}
            changeStatus={this.changeStatus}
          />
          <button className="modal-close is-large" onClick={this.assign}></button>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeStatus,
  assignStaff
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
