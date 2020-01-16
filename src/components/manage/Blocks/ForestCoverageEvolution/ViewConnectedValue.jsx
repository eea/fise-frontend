import React from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';

const SCHEMA = {
  blue: {
    title: '25-50',
    defaultformat: 'percentage',
    order: 0,
  },
  orange: {
    title: '50-100',
    defaultformat: 'percentage',
    order: 1,
  },
  grey: {
    title: '100-500',
    defaultformat: 'percentage',
    order: 2,
  },
  yellow: {
    title: '500-2000',
    defaultformat: 'percentage',
    order: 3,
  },
  lightblue: {
    title: '2000-10000',
    defaultformat: 'percentage',
    order: 4,
  },
  green: {
    title: '10000-50000',
    defaultformat: 'percentage',
    order: 5,
  },
  darkblue: {
    title: '>50000',
    defaultformat: 'percentage',
    order: 6,
  },
};
const View = props => {
  const columnsData = props.data && props.data.columns;
  return (
    <div
      className="forest-patch-size-distribution"
      style={{ marginTop: '2rem' }}
    >
      {SCHEMA
        ? Object.keys(SCHEMA)
            .sort((a, b) => SCHEMA[a].order - SCHEMA[b].order)
            .map(column => {
              return (
                <div style={{borderBottom: '1px solid #eee'}}>
                  {/* <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '.9rem',
                      marginRight: '3px',
                      width: '40px',
                      display: 'inline-block',
                      lineHeight: '2',
                    }}
                  >
                    <DataConnectedValue
                      url={props.data.provider_url}
                      column={columnsData[column].value}
                      format={columnsData[column].format}
                      placeholder="_"
                    />
                  </span> */}
                  <span
                    style={{
                      marginLeft: '3px',
                      display: 'inline-block',
                    }}
                    className="label"
                  >
                    <span style={{marginBottom: '-1px'}} className={`${column} square`} />
                    <span style={{ fontSize: '.9rem' }}>
                      {SCHEMA[column].title}
                    </span>
                  </span>
                </div>
              );
            })
        : ''}
    </div>
  );
};

export default View;
