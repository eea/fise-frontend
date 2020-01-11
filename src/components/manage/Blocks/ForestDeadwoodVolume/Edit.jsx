import React from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';

const SCHEMA = {
  total: {
    title: 'Deadwood volume column',
    defaultformat: 'compactnumber',
  },
};

const Edit = props => {
  // data is like {url: '', columns: {key: {value, format}}}
  return (
    <div className="block-container">
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
        title="Forest deadwood volume"
        selected={props.selected}
      />
      <View {...props} />
    </div>
  );
};

export default Edit;
