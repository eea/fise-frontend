import React, { Component } from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';

const clone = obj => JSON.parse(JSON.stringify(obj || {}));

const SCHEMA = {
  perc: {
    title: 'Percentage column',
    value: null,
    format: 'percentage',
  },
  totalArea: {
    title: 'Total Area column',
    value: null,
    format: 'compactnumber',
  },
};

class Edit extends Component {
  // data is like {url: '', columns: {key: {value, format}}}
  render() {
    return (
      <div className="block-container">
        <EditBlock
          onChange={data => {
            this.props.onChangeBlock(this.props.block, {
              ...this.props.data,
              ...data,
            });
          }}
          schema={clone(SCHEMA)}
          block="data-entity"
          data={this.props.data}
          title="Forest Coverage block"
        />
        <View {...this.props} />
      </div>
    );
  }
}

export default Edit;
