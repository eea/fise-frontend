import React, { useState, useEffect } from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  getSchemaWithDataQuery,
  updateConnectedDataParameters,
  getBasePath,
} from '~/helpers';

const DefaultEdit = props => {
  const [state, setState] = useState({
    schemaWithDataQuery: null,
  });
  const path = getBasePath(props.pathname);
  useEffect(() => {
    //  Set schema adding data_query if needed
    const schemaWithDataQuery = getSchemaWithDataQuery({ ...props, path });
    setState({ ...state, schemaWithDataQuery });
    /* eslint-disable-next-line */
  }, [props.schema, props.connected_data_parameters?.byContextPath, props.connected_data_parameters?.byProviderPath]);
  //  Set default provider_url on mount
  useEffect(() => {
    if (
      __CLIENT__ &&
      props.data.provider_url &&
      state.schemaWithDataQuery &&
      !props.data.providers
    ) {
      const newData = { ...JSON.parse(JSON.stringify(props.data)) };
      if (!newData.providers) newData.providers = {};
      Object.keys(state.schemaWithDataQuery).forEach(element => {
        if (state.schemaWithDataQuery[element].type === 'data-provider') {
          if (!newData.providers[element]) newData.providers[element] = {};
          if (!newData.providers[element].path) {
            newData.providers[element].path = props.data.provider_url;
          }
        }
      });
      props.onChangeBlock(props.block, {
        ...props.data,
        ...newData,
      });
    }
    /* eslint-disable-next-line */
  }, []);
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
            id: `${props.id}`,
          });
        }}
        onChangeBlock={() => {
          return;
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
