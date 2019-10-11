/**
 * Edit text tile.
 * @module components/manage/Tiles/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import cx from 'classnames';

/**
 * Edit text tile class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    detached: PropTypes.bool,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    onAddTile: PropTypes.func.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    onMutateTile: PropTypes.func.isRequired,
    onFocusPreviousTile: PropTypes.func.isRequired,
    onFocusNextTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    detached: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
      let htmltext;
      if (props.data && props.data.text) {
        htmltext = props.data.text;
      } else {
        htmltext = '<p>Please edit this text...</p>';
      }

      this.state = {
        htmltext,
      };
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(event, editor) {
    const text = editor.getData();
    console.log({ event, editor, text });
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      text,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    const CKEditor = require('@ckeditor/ckeditor5-react');
    const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');

    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={cx('tile text', { selected: this.props.selected })}
        ref={node => (this.ref = node)}
      >
        <CKEditor
          editor={ClassicEditor}
          data={this.state.htmltext}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            // console.log('Editor is ready to use!', editor);
          }}
          onChange={this.onChange}
          onBlur={(event, editor) => {
            // console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            // console.log('Focus.', editor);
          }}
        />
      </div>
    );
  }
}

export default injectIntl(Edit);
