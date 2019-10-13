import ChartEditor from './ChartEditor';
import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Label } from 'semantic-ui-react';
import { map } from 'lodash';

// import showIcon from '@plone/volto/icons/show.svg';
// import { Icon as VoltoIcon } from '@plone/volto/components';

class ModalChartEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.value,
    };
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    this.props.onChange(this.state.chartData);
  }

  render() {
    return (
      <Modal open={true} size="fullscreen">
        <Modal.Content scrolling>
          <ChartEditor
            value={this.props.value}
            onChangeValue={data => {
              console.log('Set chart data', data);
              this.setState({ chartData: data });
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button floated="right" onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

class ChartWidget extends Component {
  constructor(props) {
    super(props);

    console.log('Chartwidget props', props);
    const chartData = props.value || {};

    const layout = {
      ...chartData.layout,
      width: (chartData.layout && chartData.layout.width) || 320,
      height: (chartData.layout && chartData.layout.height) || 240,
    };

    this.state = {
      data: chartData.data || [],
      layout,
      frames: chartData.frames || [],
      showChartEditor: false,
    };

    console.log('State', this.state);
  }

  render() {
    const {
      id,
      title,
      required,
      description,
      error,
      value,
      onChange,
      fieldSet,
    } = this.props;
    if (__SERVER__) return '';

    const LoadablePlot = require('react-plotly.js').default;
    return (
      <Form.Field
        inline
        required={required}
        error={error && error.length > 0}
        className={description ? 'help' : ''}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>{title}</label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Button
                onClick={ev => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  this.setState({ showChartEditor: true });
                }}
              >
                Open Chart Editor
              </Button>

              {this.state.showChartEditor ? (
                <ModalChartEditor
                  value={value}
                  onChange={value => {
                    onChange(id, value);
                    console.log('Got value from editor', value);
                    this.setState({
                      showChartEditor: false,
                      data: (value && value.data) || [],
                      layout: (value && value.layout) || {},
                      frames: (value && value.frames) || [],
                    });
                  }}
                />
              ) : (
                ''
              )}

              <LoadablePlot
                data={this.state.data}
                layout={this.state.layout}
                frames={this.state.frames}
                config={{ displayModeBar: false }}
              />

              {map(error, message => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row stretched>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form.Field>
    );
  }
}

export default ChartWidget;
