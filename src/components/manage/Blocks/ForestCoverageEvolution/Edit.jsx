/*
 * Pick up a chart from an existing visualization, add text
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form as UiForm } from 'semantic-ui-react';

import { Field } from '@plone/volto/components'; // EditBlock
import { SidebarPortal } from '@plone/volto/components';

import { changeSidebarState } from 'volto-sidebar/actions';

import MultiValuesEdit from 'volto-datablocks/DataConnectedBlock/MultiValuesEdit';

import PickVisualization from 'volto-plotlycharts/PickVisualization';
import ConnectedChart from 'volto-plotlycharts/ConnectedChart';
import ViewConnectedValue from './ViewConnectedValue';
import { v4 as uuid } from 'uuid';

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

class ForestCoverageEvolution extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="block selected">
        <SidebarPortal selected={this.props.selected}>
          <Segment.Group raised>
            <header className="header pulled">
              <h2>{this.props.title || 'Edit chart options'}</h2>
            </header>
            <Segment className="form sidebar-image-data">
              <PickVisualization
                id={`vis-${this.props.block}`}
                onLoadChartData={chartData =>
                  this.props.onChangeBlock(this.props.block, {
                    ...this.props.data,
                    chartData,
                  })
                }
                currentChartData={this.props.data?.chartData}
                onChange={url =>
                  this.props.onChangeBlock(this.props.block, {
                    ...this.props.data,
                    vis_url: url,
                  })
                }
                value={this.props.data?.vis_url || ''}
              />
              <Field
                title="Source"
                id="chart-source"
                type="text"
                value={this.props.data.chart_source || ''}
                required={false}
                onChange={(e, d) =>
                  this.props.onChangeBlock(this.props.block, {
                    ...this.props.data,
                    chart_source: d,
                  })
                }
              />
              <Field
                title="Source Link"
                id="chart-source-link"
                type="text"
                value={this.props.data.chart_source_link || ''}
                required={false}
                onChange={(e, d) =>
                  this.props.onChangeBlock(this.props.block, {
                    ...this.props.data,
                    chart_source_link: d,
                  })
                }
              />
              <MultiValuesEdit
                schema={{ ...this.props.schema }}
                onChange={data =>
                  this.props.onChangeBlock(this.props.block, data)
                }
                data={this.props.data}
              />
            </Segment>
          </Segment.Group>
        </SidebarPortal>

        <div className="block-inner-wrapper">
          <UiForm>
            <Segment.Group horizontal>
              <Segment style={{ maxWidth: '40%' }}>
                <div className="block-container">
                  {/* <EditBlock
                    onChange={data => {
                      this.props.onChangeBlock(this.props.block, {
                        ...this.props.data,
                        ...data,
                      });
                    }}
                    schema={SCHEMA}
                    block="data-entity"
                    data={this.props.data}
                    title="Forest Coverage block"
                    selected={this.props.selected}
                  /> */}
                  <ViewConnectedValue {...this.props} />
                </div>
              </Segment>
              <Segment secondary={this.state.activeEditorSegment === 0}>
                {this.props.data?.chartData && (
                  <ConnectedChart
                    data={{ chartData: this.props.data.chartData }}
                    className="embedded-block-chart"
                    config={{ displayModeBar: false }}
                  />
                )}
              </Segment>
            </Segment.Group>
          </UiForm>
        </div>
      </div>
    );
  }
}

export default ForestCoverageEvolution;
