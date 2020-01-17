import React from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';

const View = props => {
  console.log('block props', props);
  return (
    <div className="block-container">
      <div className="forest-block-wrapper">
        <div className="forest-specific-block forest-area-block">
          <h5>Forest coverage</h5>
          <div className="land-data-wrapper eu28-data">
            <div className="land-data">
              <span>
                <DataConnectedValue
                  url={props.data.provider_url}
                  column={props.data?.columns?.perc?.value}
                  format={props.data?.columns?.perc?.format}
                  placeholder="_"
                />
              </span>
            </div>
            <div className="land-data-content">
              {props.data?.columns?.percText.value}
              <span>
                <DataConnectedValue
                  url={props.data.provider_url}
                  column={props.data?.columns?.totalArea?.value}
                  format={props.data?.columns?.totalArea?.format}
                  placeholder="_"
                />{' '}
                {props.data?.columns?.totalAreaUnit.value}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
