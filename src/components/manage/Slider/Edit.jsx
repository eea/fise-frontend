import { readAsDataURL } from 'promise-file-reader';
import { settings } from '~/config';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import React, { Component } from 'react';
import { compose } from 'redux';
import { Item, Dimmer, Loader, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router-dom';
import { createAttachment, getAllAttachments } from '~/actions';

const CONTAINER = 'slider-images';

class EditSlider extends Component {
  constructor(props) {
    super(props);
    console.log('editslider props', props);
    this.state = {
      uploading: false,
    };
    this.onDrop = this.onDrop.bind(this);
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

  componentDidMount() {
    const url = `${getBaseUrl(this.props.pathname)}/@attachments`;
    this.props.getAllAttachments(url);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pathname === prevProps.pathname) return;
    const url = `${getBaseUrl(this.props.pathname)}/@attachments`;
    this.props.getAllAttachments(url);
  }

  render() {
    console.log('props attachments', this.props.attachments);
    return (
      <div>
        <Dropzone onDrop={this.onDrop} className="dropzone">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Message>
                {(this.state.uploading && (
                  <Dimmer active>
                    <Loader indeterminate>Uploading</Loader>
                  </Dimmer>
                )) || <div>Drag files here</div>}
              </Message>
            </div>
          )}
        </Dropzone>
        <Item.Group divided>
          {this.props.attachments.map(at => (
            <Item>
              <Item.Image size="tiny" src={at.file.scales.listing.download} />
              <Item.Content>{at.text}</Item.Content>
            </Item>
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
    },
  ),
  withRouter,
)(EditSlider);
