import Dropzone from 'react-dropzone';
import Editor from '@plone/volto/components/manage/Tiles/Text/Edit';
import React, { Component } from 'react';
import clearIcon from '@plone/volto/icons/clear.svg';
import penIcon from '@plone/volto/icons/pen.svg';
import { Grid, Button, Item, Dimmer, Loader, Message } from 'semantic-ui-react';
import { Icon as VoltoIcon } from '@plone/volto/components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  createAttachment,
  getAllAttachments,
  updateAttachment,
  deleteAttachment,
} from '~/actions';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { readAsDataURL } from 'promise-file-reader';
import { settings } from '~/config';
import { withRouter } from 'react-router-dom';
import redraft from 'redraft';
import ReactDOMServer from 'react-dom/server';

// import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
// import Editor from 'draft-js-plugins-editor';

const CONTAINER = 'slider-images';

class SlideEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editorState: null,
    };
    this.save = this.save.bind(this);
    this.onChangeTile = this.onChangeTile.bind(this);
    this.sendDelete = this.sendDelete.bind(this);
  }

  onChangeTile(id, data) {
    this.setState({
      editorState: data,
    });
    console.log(arguments);
  }

  sendDelete() {
    this.props.onDelete(this.props.slide['@id']);
  }

  save() {
    const text = ReactDOMServer.renderToStaticMarkup(
      redraft(
        this.state.editorState.text,
        settings.ToHTMLRenderers,
        settings.ToHTMLOptions,
      ),
    );
    this.setState({ editing: false }, () => {
      this.props.onChange(this.props.slide['@id'], text);
    });
  }

  nop() {}

  node = React.createRef();

  render() {
    const slide = this.props.slide;
    return (
      <div ref={this.node}>
        <Item>
          <Grid cols={12}>
            <Grid.Row>
              <Grid.Column width={2}>
                <Item.Image
                  src={flattenToAppURL(slide.file.scales.thumb.download)}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                {this.state.editing ? (
                  <Editor
                    index={this.props.index}
                    detached={true}
                    selected={false}
                    tile={slide['@id']}
                    onAddTile={this.nop}
                    onChangeTile={this.onChangeTile}
                    onDeleteTile={this.nop}
                    onFocusPreviousTile={this.nop}
                    onFocusNextTile={this.nop}
                    onSelectTile={this.nop}
                    onMutateTile={this.nop}
                    data={slide.text || {}}
                    tileNode={this.node}
                  />
                ) : (
                  <div>{slide.text}</div>
                )}
              </Grid.Column>
              <Grid.Column width={2}>
                {!this.state.editing && (
                  <Button
                    size="mini"
                    onClick={() => this.setState({ editing: true })}
                  >
                    <VoltoIcon size="10" name={penIcon} />
                    Edit
                  </Button>
                )}
                {this.state.editing && (
                  <Button size="mini" onClick={this.save}>
                    <VoltoIcon size="10" name={penIcon} />
                    Save
                  </Button>
                )}
                <Button size="mini" onClick={this.sendDelete}>
                  <VoltoIcon size="10" name={clearIcon} />
                  Delete
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item>
      </div>
    );
  }
}

class EditSlider extends Component {
  constructor(props) {
    super(props);
    console.log('editslider props', props);
    this.state = {
      uploading: false,
    };

    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDrop(acceptedFiles) {
    console.log('ondrop props', this.props);
    this.setState({ uploading: true });
    acceptedFiles.forEach(file => {
      readAsDataURL(file).then(data => {
        const fields = data.match(/^data:(.*);(.*),(.*)$/);

        this.props.createAttachment(
          `${getBaseUrl(this.props.pathname)}/@attachments`,
          {
            '@container': CONTAINER,
            text: file.name,
            file: {
              data: fields[3],
              encoding: fields[2],
              'content-type': fields[1],
              filename: file.name,
            },
          },
        );
      });
    });
  }

  onDelete(path) {
    this.props.deleteAttachment(path.replace(settings.apiPath, ''));
  }

  componentDidMount() {
    const url = `${getBaseUrl(this.props.pathname)}/@attachments`;
    this.props.getAllAttachments(url);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pathname === prevProps.pathname) return;
    const url = `${getBaseUrl(this.props.pathname)}/@attachments`;
    this.props.getAllAttachments(url);
  }

  onChange(id, data) {
    this.props.saveAttachment(id, data);
    console.log('on change', data);
  }

  render() {
    console.log('props attachments', this.props.attachments);
    return (
      <div>
        <Dropzone onDrop={this.onDrop} className="dropzone">
          <Message>
            {(this.state.uploading && (
              <Dimmer active>
                <Loader indeterminate>Uploading</Loader>
              </Dimmer>
            )) || <div>Drag files here</div>}
          </Message>
        </Dropzone>
        <Item.Group divided>
          {this.props.attachments.map((at, i) => (
            <SlideEditor
              key={at['@id']}
              slide={at}
              index={i}
              onChange={this.onChange}
              onDelete={this.onDelete}
            />
          ))}
        </Item.Group>
        {this.props.attach_errors || ''}
        {this.props.data.url ? (
          <p>
            <img
              src={
                this.props.data.url.includes(settings.apiPath)
                  ? `${flattenToAppURL(this.props.data.url)}/@@images/image`
                  : this.props.data.url
              }
              alt=""
            />
          </p>
        ) : null}
      </div>
    );
  }
}

function getSliderImages(attachments) {
  if (!attachments) return [];

  const atch = attachments.attachments || [];
  const slider = (atch && atch.find(el => el['@id'] === 'slider-images')) || [];
  return (slider && slider.items) || [];
}

export default compose(
  connect(
    (state, props) => ({
      data: {},
      attachments: getSliderImages(state.attachments || {}),
      pathname: props.location.pathname,
      attach_errors: state.attachments.errors,
    }),
    {
      createAttachment,
      getAllAttachments,
      updateAttachment,
      deleteAttachment,
    },
  ),
  withRouter,
)(EditSlider);
