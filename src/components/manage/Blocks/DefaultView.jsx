import { useState, useEffect } from 'react';
import _uniqueId from 'lodash/uniqueId';

import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  setConnectedDataParameters,
  deleteConnectedDataParameters,
} from 'volto-datablocks/actions';

import { getSchemaWithDataQuery, objectHasData, getBasePath } from '~/helpers';

const DefaultView = props => {
  const [state, setState] = useState({
    id: _uniqueId('block_'),
    schemaWithDataQuery: null,
    dataQueryKeys: null,
    ids: [],
  });
  const id = props.id || state.id;
  const path = getBasePath(props.pathname);
  if (
    !state.schemaWithDataQuery &&
    props.schema &&
    props?.connected_data_parameters?.byContextPath &&
    props?.connected_data_parameters?.byProviderPath
  ) {
    const schemaWithDataQuery = getSchemaWithDataQuery(props);
    setState({ ...state, schemaWithDataQuery });
  }
  if (state.schemaWithDataQuery && !state.dataQueryKeys) {
    const dataQueryKeys = [];
    const ids = [...state.ids];
    Object.keys(state.schemaWithDataQuery).forEach(element => {
      if (state.schemaWithDataQuery[element].type === 'data-query') {
        dataQueryKeys.push(element);
        ids.push(`${id}_${element}`);
      }
    });
    setState({ ...state, dataQueryKeys, ids });
  }
  //  Update connected_data_parameters if data_query available in data.columns
  __CLIENT__ &&
    state.dataQueryKeys &&
    state.dataQueryKeys.forEach((key, index) => {
      if (
        !objectHasData(props.connected_data_parameters.byProviderPath) &&
        !objectHasData(props.connected_data_parameters.byContextPath) &&
        !props.connected_data_parameters?.byPath?.[path]?.override?.[
          state.ids[index]
        ] &&
        props?.data?.columns?.[key]?.value?.i &&
        props?.data?.columns?.[key]?.value?.v
      ) {
        props.dispatch(
          setConnectedDataParameters(
            path,
            props.data.columns[key].value,
            state.ids[index],
          ),
        );
      }
    });
  useEffect(() => {
    props.onChange && props.onChange(state);
    return () => {
      __CLIENT__ &&
        state.dataQueryKeys &&
        state.dataQueryKeys.forEach((key, index) => {
          props.dispatch(deleteConnectedDataParameters(path, state.ids[index]));
        });
    };
    /* eslint-disable-next-line */
  }, [state]);
  return props.view;
};

export default compose(
  connect((state, props) => ({
    connected_data_parameters: state.connected_data_parameters,
    pathname: state.router.location.pathname,
  })),
)(DefaultView);
