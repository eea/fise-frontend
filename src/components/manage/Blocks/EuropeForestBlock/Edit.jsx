import React, { Component } from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';

const SCHEMA = {
  eu28_total: {
    title: 'EU28 volume column',
    defaultformat: 'compactnumber',
  },
  eu28_total_text: {
    title: 'EU28 volume text',
    defaultformat: 'compactnumber',
    static: true,
  },
  eu28_total_unit: {
    title: 'EU28 volume unit',
    defaultformat: 'compactnumber',
    static: true,
  },
  eea39_total: {
    title: 'EEA39 volume column',
    defaultformat: 'compactnumber',
  },
  eea39_total_text: {
    title: 'EEA39 volume text',
    defaultformat: 'compactnumber',
    static: true,
  },
  eea39_total_unit: {
    title: 'EEA39 volume unit',
    defaultformat: 'compactnumber',
    static: true,
  }
};


const Edit = props => {
  return (
    <div>
      <EditBlock
        onChange={data => {
          props.onChangeBlock(props.block, {
            ...props.data,
            ...data,
          });
        }}
        schema={SCHEMA}
        block="data-entity"
        data={props.data}
        title="Volume block"
        selected={props.selected}
      />
      <View {...props} />
    </div>
  );
}

export default Edit;
