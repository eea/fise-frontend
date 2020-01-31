import React from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';

const SCHEMA = {
  perc: {
    title: 'Percentage column',
    defaultformat: 'percentage',
  },
  totalArea: {
    title: 'Total Area column',
    defaultformat: 'compactnumber',
  },
  percText: {
    title: 'Text for percentage column',
    static: true,
  },
  totalAreaUnit: {
    title: 'Measurement unit for total area',
    static: true,
  },
};

const Edit = props => {
  // data is like {provider_url: '', columns: {key: {value, format}}}
  return (
    <React.Fragment>
      <EditBlock
        onChange={data => {
          props.onChangeBlock(props.block, {
            ...props.data,
            ...data,
          });
        }}
        schema={SCHEMA}
        block={props.block}
        data={props.data}
        title="Forest Coverage block"
        selected={props.selected}
      />
      <View {...props} />
    </React.Fragment>
  );
};

export default Edit;
