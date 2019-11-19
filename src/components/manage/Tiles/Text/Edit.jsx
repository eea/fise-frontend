/**
 * Edit text block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import cx from 'classnames';

// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

/**
 * Edit text block class.
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
    block: PropTypes.string.isRequired,
    onAddBlock: PropTypes.func.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onMutateBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
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
      const htmltext = (props.data && props.data.cktext) || '';

      this.state = {
        htmltext,
      };
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(event, editor) {
    const cktext = editor.getData();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      cktext,
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
    // console.log(
    //   'plugins',
    //   ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName),
    // );
    // const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon-block');
    // const ClassicEditor = require('@ckeditor/ckeditor5-editor-classic/src/classiceditor');

    const editorConfiguration = {
      heading: {
        options: [
          // {
          //   model: 'paragraph',
          //   title: 'Paragraph Tibi',
          //   class: 'ck-heading_paragraph',
          // },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Block Title (H5)',
            class: 'ck-heading_heading5',
          },
          {
            model: 'block_description',
            view: {
              name: 'div',
              classes: 'chart-highlight',
            },
            title: 'Block Description',
            class: 'chart-highlight',
          },
          // {
          //   model: 'heading2',
          //   view: 'h2',
          //   title: 'Heading 2',
          //   class: 'ck-heading_heading2',
          // },
        ],
      },
    };
    //

    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectBlock(this.props.block)}
        className={cx('block text', { selected: this.props.selected })}
        ref={node => (this.ref = node)}
      >
        <CKEditor
          config={editorConfiguration}
          editor={ClassicEditor}
          data={this.state.htmltext}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            // console.log('Editor is ready to use!', editor);
          }}
          onChange={this.onChange}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
      </div>
    );
  }
}

export default injectIntl(Edit);
