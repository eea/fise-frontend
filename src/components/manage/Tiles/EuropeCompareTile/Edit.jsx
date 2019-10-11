import React, { Component } from 'react';
import { Form as UiForm, Header } from 'semantic-ui-react';
import { Field } from '@plone/volto/components'; // EditTile

class Edit extends Component {
  constructor(props) {
    super(props);

    const tileData = props.data;

    this.state = {
      ...tileData,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(obj) {
    this.setState(obj, this.onSubmit);
  }

  onSubmit() {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      ...this.state,
    });
  }

  render() {
    return (
      <div className="tile selected">
        <div className="tile-inner-wrapper">
          <UiForm>
            <Field
              id="europe-tile-title"
              title="Title"
              type="text"
              value={this.state.europe_tile_title}
              required={false}
              onChange={(e, d) => this.updateData({ europe_tile_title: d })}
            />
            <Field
              id="europe-protected-area"
              title="Protected area"
              type="text"
              value={this.state.europe_protected_area}
              required={false}
              onChange={(e, d) => this.updateData({ europe_protected_area: d })}
              />
            <Field
              id="europe-total-area"
              title="Total area"
              type="text"
              value={this.state.europe_total_area}
              required={false}
              onChange={(e, d) => this.updateData({ europe_total_area: d })}
            />

            <h5> Top Countries:</h5>

            <UiForm.Group widths="equal">
              <Field
                id="europe-country-1-name"
                title="Country name"
                type="text"
                value={this.state.europe_country_1_name}
                required={false}
                onChange={(e, d) => this.updateData({ europe_country_1_name: d })}
                />
              <Field
                id="europe-country-1-value"
                title="Country value"
                type="text"
                value={this.state.europe_country_1_value}
                required={false}
                onChange={(e, d) => this.updateData({ europe_country_1_value: d })}
                />
            </UiForm.Group>

            <UiForm.Group widths="equal">
              <Field
                id="europe-country-2-name"
                title="Country name"
                type="text"
                value={this.state.europe_country_2_name}
                required={false}
                onChange={(e, d) => this.updateData({ europe_country_2_name: d })}
                />
              <Field
                id="europe-country-2-value"
                title="Country value"
                type="text"
                value={this.state.europe_country_2_value}
                required={false}
                onChange={(e, d) => this.updateData({ europe_country_2_value: d })}
                />
            </UiForm.Group>

            <UiForm.Group widths="equal">
              <Field
                id="europe-country-3-name"
                title="Country name"
                type="text"
                value={this.state.europe_country_3_name}
                required={false}
                onChange={(e, d) => this.updateData({ europe_country_3_name: d })}
                />
              <Field
                id="europe-country-3-value"
                title="Country value"
                type="text"
                value={this.state.europe_country_3_value}
                required={false}
                onChange={(e, d) => this.updateData({ europe_country_3_value: d })}
                />
            </UiForm.Group>

            <Field
              id="europe-tile-link"
              title="Link"
              type="text"
              value={this.state.europe_tile_link}
              required={false}
              onChange={(e, d) => this.updateData({ europe_tile_link: d })}
            />
          </UiForm>
        </div>
      </div>
    );
  }
}

export default Edit;
