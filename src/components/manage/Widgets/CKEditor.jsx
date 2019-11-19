import React from 'react';
import { Form, Grid, Label } from 'semantic-ui-react';
import { map } from 'lodash';

const CKText = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  fieldSet,
}) => {
  if (__SERVER__) return <div />;
  const CKEditor = require('@ckeditor/ckeditor5-react');
  const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');

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

  return (
    <Form.Field
      inline
      required={required}
      error={error ? error.length > 0 : false}
      id={`${fieldSet || 'field'}-${id}`}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>{title}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <CKEditor
              id={`field-${id}`}
              name={id}
              config={editorConfiguration}
              editor={ClassicEditor}
              data={value || ''}
              onInit={editor => {}}
              onChange={(event, editor) => onChange(id, editor.getData())}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
            {map(error, message => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  );
};

export default CKText;
