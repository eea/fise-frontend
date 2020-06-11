import React, { useState, useEffect } from 'react';
import _uniqueId from 'lodash/uniqueId';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import { SourceView } from 'volto-datablocks/Sources';

import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  setConnectedDataParameters,
  deleteConnectedDataParameters,
} from 'volto-datablocks/actions';

import { getSchema } from './schema';
import { objectHasData, getBasePath } from '~/helpers';

const View = props => {
  const [state, setState] = useState({
    id: _uniqueId('block_'),
    schemaWithDataQuery: null,
    dataQueryKeys: null,
  });
  const id = props.id || state.id;
  const path = getBasePath(props.pathname);
  if (!state.schemaWithDataQuery) {
    const schemaWithDataQuery = getSchema(props.connected_data_parameters);
    setState({ ...state, schemaWithDataQuery });
  }
  if (state.schemaWithDataQuery && !state.dataQueryKeys) {
    const dataQueryKeys = [];
    Object.keys(state.schemaWithDataQuery).forEach(element => {
      if (state.schemaWithDataQuery[element].type === 'data-query') {
        dataQueryKeys.push(element);
      }
    });
    setState({ ...state, dataQueryKeys });
  }
  //  Update connected_data_parameters if data_query available in data.columns
  __CLIENT__ &&
    state.dataQueryKeys &&
    state.dataQueryKeys.forEach((key, index) => {
      if (
        !objectHasData(props.connected_data_parameters).byProviderPath &&
        !objectHasData(props.connected_data_parameters).byContextPath &&
        !props.connected_data_parameters?.byPath?.[path]?.override?.[
          `block_${id}_${key}`
        ] &&
        props?.data?.columns?.[key]?.value?.i &&
        props?.data?.columns?.[key]?.value?.v
      ) {
        props.dispatch(
          setConnectedDataParameters(
            path,
            props.data.columns[key].value,
            `block_${id}_${key}`,
          ),
        );
      }
    });
  useEffect(() => {
    return () => {
      __CLIENT__ &&
        state.dataQueryKeys &&
        state.dataQueryKeys.forEach((key, index) => {
          props.dispatch(
            deleteConnectedDataParameters(path, `block_${id}_${key}`),
          );
        });
    };
    /* eslint-disable-next-line */
  }, []);
  return (
    <div className="forest-block-wrapper">
      <div className="forest-specific-block forest-area-block">
        {props.data?.block_title ? <h5>{props.data.block_title}</h5> : ''}

        <div className="land-data-wrapper">
          <div className="land-data">
            <span>
              {props.data.providers &&
                props.data.providers['data_provider'] &&
                props.data.columns?.total && (
                  <DataConnectedValue
                    filterIndex={`block_${id}_data_provider_data_query`}
                    url={props.data.providers['data_provider']?.path}
                    column={props.data.columns.total.value}
                    format={props.data.columns.total.format}
                    placeholder="_"
                  />
                )}
            </span>
          </div>
          <div className="land-data-content">
            <span>{props.data?.columns?.totalUnit?.value}</span>
            {props.data?.columns?.totalText?.value}
          </div>
        </div>

        <div className="ui bulleted list">
          <div className="item">
            {props.data?.columns?.data1Text?.value}
            <span>{props.data?.columns?.data1Quantity?.value}</span>
          </div>
          <div className="item">
            {props.data?.columns?.data2Text?.value}
            <span>{props.data?.columns?.data2Quantity?.value}</span>
          </div>
        </div>

        <div>
          {props?.data?.chart_source &&
            props?.data?.chart_source_link &&
            props?.data?.chartSources &&
            props?.data?.providers &&
            props?.data?.providers['data_provider'] && (
              <SourceView
                initialSource={props.data.chart_source}
                initialSourceLink={props.data.chart_source_link}
                multipleSources={props.data.chartSources}
                providerUrl={props?.data?.providers['data_provider']}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    connected_data_parameters: state.connected_data_parameters,
    pathname: state.router.location.pathname,
  })),
)(View);
