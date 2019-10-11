import React, { Component } from 'react';
import { Form as UiForm } from 'semantic-ui-react';
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
                id="europe-forest-surface-area"
                title="Surface"
                type="text"
                value={this.state.europe_forest_surface}
                required={false}
                onChange={(e, d) => this.updateData({ europe_forest_surface: d })}
                />

            <Field
                id="europe-total-area"
                title="Total area"
                type="text"
                value={this.state.europe_total_area}
                required={false}
                onChange={(e, d) => this.updateData({ europe_total_area: d })}
              />

            <Field
                id="europe-total-public"
                title="Total public"
                type="text"
                value={this.state.europe_total_public}
                required={false}
                onChange={(e, d) => this.updateData({ europe_total_public: d })}
              />

            <Field
                id="europe-total-private"
                title="Total private"
                type="text"
                value={this.state.europe_total_private}
                required={false}
                onChange={(e, d) => this.updateData({ europe_total_private: d })}
              />

            <Field
                id="europe-source"
                title="Source"
                type="text"
                value={this.state.europe_text_attribution}
                required={false}
                onChange={(e, d) => this.updateData({ europe_text_attribution: d })}
              />

            <Field
              id="europe-tile-link"
              title="Source link"
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
