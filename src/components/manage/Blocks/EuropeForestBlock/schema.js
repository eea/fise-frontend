import { getSchemaWithDataQuery } from '~/helpers';

export const getSchema = connected_data_parameters => {
  const schema = {
    eu28_data_provider: {
      title: 'EU28 data provider',
      defaultformat: 'compactnumber',
      type: 'data-provider',
    },
    eu28_total: {
      title: 'EU28 volume column',
      defaultformat: 'compactnumber',
      type: 'data-provider-entity',
      provider: 'eu28_data_provider',
    },
    eu28_total_text: {
      title: 'EU28 volume text',
      defaultformat: 'compactnumber',
      static: true,
    },
    eu28_total_unit: {
      title: 'EU28 volume unit',
      defaultformat: 'compactnumber',
      static: true,
    },
    eea39_data_provider: {
      title: 'EEA39 data provider',
      defaultformat: 'compactnumber',
      type: 'data-provider',
    },
    eea39_total: {
      title: 'EEA39 volume column',
      defaultformat: 'compactnumber',
      type: 'data-provider-entity',
      provider: 'eea39_data_provider',
    },
    eea39_total_text: {
      title: 'EEA39 volume text',
      defaultformat: 'compactnumber',
      static: true,
    },
    eea39_total_unit: {
      title: 'EEA39 volume unit',
      defaultformat: 'compactnumber',
      static: true,
    },
  };

  return getSchemaWithDataQuery({ schema, connected_data_parameters });
};
