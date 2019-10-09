import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getDataProviders } from '~/actions';

class DataProvidersView extends Component {
  static propTypes = {
    getDataProviders: PropTypes.func.isRequired,
    providers: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      providers: props.providers,
    };
  }

  componentWillReceiveProps(nextProps) {
    let old = JSON.stringify(this.props.providers);
    let neu = JSON.stringify(nextProps.providers);

    if (old !== neu) {
      this.setState({ providers: nextProps.providers });
    }
  }

  componentWillMount() {
    this.props.getDataProviders();
  }

  render() {
    console.log('state', this.state.providers);
    // return this.state.settings && this.state.settings.styles ? (
    //   <div>{this.state.settings.styles.map(this.getCard)}</div>
    // ) : (
    //   ''
    // );
    return <div />;
  }
}

export default connect(
  state => ({
    providers: state.data_providers.items,
  }),
  { getDataProviders },
)(DataProvidersView);
