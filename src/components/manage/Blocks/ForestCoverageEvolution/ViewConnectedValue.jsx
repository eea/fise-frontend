import React from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';

const SCHEMA = {
  blue: {
    title: '25-50',
    defaultformat: 'percentage',
  },
  orange: {
    title: '50-100',
    defaultformat: 'percentage',
  },
  grey: {
    title: '100-500',
    defaultformat: 'percentage',
  },
  yellow: {
    title: '500-2000',
    defaultformat: 'percentage',
  },
  lightblue: {
    title: '2000-10000',
    defaultformat: 'percentage',
  },
  green: {
    title: '10000-50000',
    defaultformat: 'percentage',
  },
  darkblue: {
    title: '>50000',
    defaultformat: 'percentage',
  },
};
const View = props => {
  console.log('block props', props);
  const columnsData = props.data && props.data.columns;
  console.log('columnsdata', columnsData);
  return (
    <div className="forest-patch-size-distribution">
      {columnsData
        ? Object.keys(columnsData).map(column => {
            return (
              <div>
                <span className="label">
                  <span className={`${column} square`} />
                  {SCHEMA[column].title}
                </span>{' '}
                -
                <DataConnectedValue
                  url={props.data.provider_url}
                  column={columnsData[column].value}
                  format={columnsData[column].format}
                  placeholder="_"
                />
              </div>
            );
          })
        : ''}
    </div>
  );
};

export default View;
