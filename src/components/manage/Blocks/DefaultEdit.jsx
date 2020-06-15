import React, { useState } from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  getSchemaWithDataQuery,
  updateConnectedDataParameters,
} from '~/helpers';

const DefaultEdit = props => {
  const [state, setState] = useState({
    schemaWithDataQuery: null,
  });
  if (
    !state.schemaWithDataQuery &&
    props.schema &&
    props?.connected_data_parameters?.byContextPath &&
    props?.connected_data_parameters?.byProviderPath
  ) {
    const schemaWithDataQuery = getSchemaWithDataQuery({
      schema: props.schema,
      connected_data_parameters: props.connected_data_parameters,
    });
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
            id: `block_${props.id}`,
          });
        }}
        schema={state.schemaWithDataQuery}
        block="data-entity"
        data={props.data}
        title="Volume block"
        selected={props.selected}
      />
    </div>
  );
};
export default compose(
  connect((state, props) => ({
    connected_data_parameters: state.connected_data_parameters,
    pathname: state.router.location.pathname,
  })),
)(DefaultEdit);
