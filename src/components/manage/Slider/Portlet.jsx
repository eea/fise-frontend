import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';

import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import penSVG from '@plone/volto/icons/envelope.svg';
import { getBaseUrl } from '@plone/volto/helpers';

class EditSliderButton extends Component {
  render() {
    const path = getBaseUrl(this.props.pathname);
    const provides = this.props.content['@provides'] || [];
    const show = provides.includes(
      'forests.content.slides.interfaces.IHasSliderImages',
    );
    console.log('provides', provides);

    return (
      (show && (
        <Portal node={__CLIENT__ && document.querySelector('.toolbar-actions')}>
          <Link
            aria-label="Edit Slider"
            className="edit-slider"
            to={`${path}/manage-slider`}
          >
            <Icon name={penSVG} size="30px" className="circled" />
          </Link>
        </Portal>
      )) ||
      ''
    );
  }
}

export default connect(
  (state, props) => ({
    // actions: state.actions.actions,
    // token: state.userSession.token,
    content: state.content.data,
    pathname: props.pathname,
  }),
  {
    //getTypes, listActions
  },
)(EditSliderButton);
