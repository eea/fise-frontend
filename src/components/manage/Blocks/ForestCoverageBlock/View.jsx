import React from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import SourceView from '~/components/theme/Blocks/SourceView';

const View = props => {
  // console.log('block props', props);
  return (
    <div className="forest-block-wrapper">
      <div className="forest-specific-block forest-area-block">
        {props.data?.block_title ? <h5>{props.data.block_title}</h5> : ''}
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
            <span>
              <DataConnectedValue
                url={props.data.provider_url}
                column={props.data?.columns?.totalArea?.value}
                format={props.data?.columns?.totalArea?.format}
                placeholder="_"
              />{' '}
              {props.data?.columns?.totalAreaUnit?.value}
            </span>
            {props.data?.columns?.percText?.value}
          </div>
        </div>
        <div>
          <SourceView
            initialSource={props.data.chart_source}
            initialSourceLink={props.data.chart_source_link}
            multipleSources={props.data.chartSources}
          />
        </div>
      </div>
    </div>
  );
};

export default View;
