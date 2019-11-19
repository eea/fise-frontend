import React, { Component } from 'react';
import { Form as UiForm } from 'semantic-ui-react';
import { Field } from '@plone/volto/components'; // EditBlock

class Edit extends Component {
  constructor(props) {
    super(props);

    const blockData = props.data;

    this.state = {
      ...blockData,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(obj) {
    this.setState(obj, this.onSubmit);
  }

  onSubmit() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      ...this.state,
    });
  }

  render() {
    return (
      <div className="block selected">
        <div className="block-inner-wrapper">
          <UiForm>
            <Field
              id="europe-block-title"
              title="Title"
              type="text"
              value={this.state.europe_block_title}
              required={false}
              onChange={(e, d) => this.updateData({ europe_block_title: d })}
            />
            <Field
              id="europe-forest-area"
              title="Total forest land"
              type="text"
              value={this.state.europe_forest_area}
              required={false}
              onChange={(e, d) => this.updateData({ europe_forest_area: d })}
              />

            <UiForm.Group widths="equal">
              <Field
                id="europe-data-1-name"
                title="Data"
                type="text"
                value={this.state.europe_data_1_name}
                required={false}
                onChange={(e, d) => this.updateData({ europe_data_1_name: d })}
                />
              <Field
                id="europe-data-1-value"
                title="Value"
                type="text"
                value={this.state.europe_data_1_value}
                required={false}
                onChange={(e, d) => this.updateData({ europe_data_1_value: d })}
                />
            </UiForm.Group>

            <UiForm.Group widths="equal">
              <Field
                id="europe-data-2-name"
                title="Data"
                type="text"
                value={this.state.europe_data_2_name}
                required={false}
                onChange={(e, d) => this.updateData({ europe_data_2_name: d })}
                />
              <Field
                id="europe-country-2-value"
                title="Value"
                type="text"
                value={this.state.europe_data_2_value}
                required={false}
                onChange={(e, d) => this.updateData({ europe_data_2_value: d })}
                />
            </UiForm.Group>

            <Field
              id="europe-block-source"
              title="Source"
              type="text"
              value={this.state.europe_text_attribution}
              required={false}
              onChange={(e, d) => this.updateData({ europe_text_attribution: d })}
            />

            <Field
              id="europe-block-link"
              title="Source link"
              type="text"
              value={this.state.europe_block_link}
              required={false}
              onChange={(e, d) => this.updateData({ europe_block_link: d })}
            />
          </UiForm>
        </div>
      </div>
    );
  }
}

export default Edit;
