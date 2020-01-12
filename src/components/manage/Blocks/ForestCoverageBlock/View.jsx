import React from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';

const View = props => {
  return (
    <div className="block-container">
      <div className="forest-block-wrapper">
        <div className="forest-specific-block forest-area-block">
          <h5>Forest coverage</h5>
          <div className="land-data-wrapper eu28-data">
            <div className="land-data">
              <span>
                {props.data.url && props.data.columns?.perc && (
                  <DataConnectedValue
                    url={props.data.provider_url}
                    column={props.data.columns.perc.value}
                    format={props.data.columns.perc.format}
                    placeholder="_"
                  />
                )}
              </span>
            </div>
            <div className="land-data-content">
              of land surface
              <span>
                {props.data.url && props.data.columns?.totalArea && (
                  <DataConnectedValue
                    url={props.data.provider_url}
                    column={props.data.columns.totalArea.value}
                    format={props.data.columns.totalArea.format}
                    placeholder="_"
                  />
                )}{' '}
                ha
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
