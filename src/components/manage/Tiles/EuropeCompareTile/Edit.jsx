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
          </UiForm>
        </div>
      </div>
    );
  }
}

export default Edit;
