import React from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';

const SCHEMA = {
  total: {
    title: 'Volume column',
    defaultformat: 'compactnumber',
  },
  totalText: {
    title: 'Volume text',
    defaultformat: 'compactnumber',
    static: true,
  },
  totalUnit: {
    title: 'Volume unit',
    defaultformat: 'compactnumber',
    static: true,
  },
};

const Edit = props => {
  // data is like {provider_url: '', columns: {key: {value, format}}}
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
};

export default Edit;
