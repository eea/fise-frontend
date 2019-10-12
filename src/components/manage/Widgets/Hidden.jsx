import React from 'react';
import { Form, Grid, Input, Label } from 'semantic-ui-react';
import { map } from 'lodash';

const HiddenWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  fieldSet,
}) => (
  <Form.Field
    inline
    required={required}
    error={error ? error.length > 0 : false}
    className="hiddenWidget"
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
          <Input
            id={`field-${id}`}
            name={id}
            type="text"
            value={(value && JSON.stringify(value)) || ''}
            onChange={({ target }) =>
              onChange(id, target.value === '' ? undefined : target.value)
            }
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

export default HiddenWidget;
