import React, { Component } from 'react';
import { Form as UiForm } from 'semantic-ui-react';
import { Field } from '@plone/volto/components'; // EditBlock
import ConnectedDataValue from 'volto-datablocks/dataentity/components/ConnectedDataValue';
import EditBlock from 'volto-datablocks/dataentity/components/EditBlock';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.data.url || null,
      columns: {
        column1: props.data.columns?.column1 || null,
        column2: props.data.columns?.column2 || null,
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(obj) {
    this.setState({ ...this.state, ...obj }, this.onSubmit);
  }

  onSubmit() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      ...this.state,
    });
  }

  render() {
    return (
      <div className="block-container">
        <EditBlock
          updateData={this.updateData}
          block="data-entity"
          data={this.state}
          title="Data block parameters"
        />
        <div className="forest-specific-block forest-area-block">
          <h5>Forest coverage</h5>
          <div className="land-data-wrapper eu28-data">
            <div className="land-data">
              <span>
                {this.props.data.url && this.props.data.columns?.column1 && (
                  <ConnectedDataValue
                    url={this.props.data.url}
                    column={this.props.data.columns.column1}
                  />
                )}
              </span>
            </div>
            <div className="land-data-content">
              of land surface
              <span>
                {this.props.data.url && this.props.data.columns?.column2 && (
                  <ConnectedDataValue
                    url={this.props.data.url}
                    column={this.props.data.columns.column2}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
