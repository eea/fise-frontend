import React from 'react';
import Edit from 'volto-plotlycharts/EmbedChartBlock/Edit';

const SCHEMA = {
  total: {
    title: 'Deadwood volume column',
    defaultformat: 'compactnumber',
  },
  totalA: {
    title: 'Deadwood volume columnA',
    defaultformat: 'compactnumber',
  },
};

const EditBlock = props => (
  <Edit title="Forest Coverage Evolution" schema={SCHEMA} {...props} />
);
export default EditBlock;
