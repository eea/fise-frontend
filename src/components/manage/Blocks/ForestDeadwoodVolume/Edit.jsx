import React, { useState } from 'react';
import _uniqueId from 'lodash/uniqueId';
import DefaultEdit from '../DefaultEdit';
import View from './View';

const schema = require('./schema.json');
const Edit = props => {
  const [state] = useState({
    id: _uniqueId('block_'),
  });
  return (
    <div>
      <DefaultEdit {...props} id={state.id} schema={schema} />
      <View {...props} id={state.id} />
    </div>
  );
};
export default Edit;
