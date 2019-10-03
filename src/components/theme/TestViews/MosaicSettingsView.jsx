import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getMosaicSettings } from '~/actions';

class MosaicSettingsView extends Component {
  static propTypes = {
    getMosaicSettings: PropTypes.func.isRequired,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      settings: props.settings,
    };
  }

  componentWillReceiveProps(nextProps) {
    let oldSettings = JSON.stringify(this.props.settings);
    let newSettings = JSON.stringify(nextProps.settings);

    if (oldSettings !== newSettings) {
      this.setState({ settings: nextProps.settings });
    }
  }

  componentWillMount() {
    this.props.getMosaicSettings();
  }

  getCard(style, key) {
    let bits = style.split('|');
    let name = bits[0];
    let klass = 'tile-box preview ' + bits[1];

    return (
      <div className={klass} key={key}>
        {name}
      </div>
    );
  }
  render() {
    console.log('state', this.state.settings);
    return this.state.settings && this.state.settings.styles ? (
      <div>{this.state.settings.styles.map(this.getCard)}</div>
    ) : (
      ''
    );
  }
}

export default connect(
  state => ({
    settings: state.mosaic_settings.items,
  }),
  { getMosaicSettings },
)(MosaicSettingsView);
