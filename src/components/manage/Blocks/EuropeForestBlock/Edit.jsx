import React, { useState } from 'react';
import _uniqueId from 'lodash/uniqueId';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getSchema } from './schema';

import { updateConnectedDataParameters } from '~/helpers';

const Edit = props => {
  const [state, setState] = useState({
    schemaWithDataQuery: null,
    id: _uniqueId('block_'),
  });
  if (!state.schemaWithDataQuery) {
    const schemaWithDataQuery = getSchema(props.connected_data_parameters);
    setState({ ...state, schemaWithDataQuery });
  }
  return (
    <div>
      <EditBlock
        onChange={data => {
          props.onChangeBlock(props.block, {
            ...props.data,
            ...data,
          });
          updateConnectedDataParameters({
            ...props,
            newData: {
              ...data,
            },
            schema: state.schemaWithDataQuery,
            id: `block_${state.id}`,
          });
        }}
        schema={state.schemaWithDataQuery}
        block="data-entity"
        data={props.data}
        title="Volume block"
        selected={props.selected}
      />
      <View {...props} id={state.id} />
    </div>
  );
};
export default compose(
  connect((state, props) => ({
    connected_data_parameters: state.connected_data_parameters,
    pathname: state.router.location.pathname,
  })),
)(Edit);
