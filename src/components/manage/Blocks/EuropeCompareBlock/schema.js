import { getSchemaWithDataQuery } from '~/helpers';

export const getSchema = connected_data_parameters => {
  const schema = {
    data_provider: {
      title: 'Data provider',
      defaultformat: 'compactnumber',
      type: 'data-provider',
    },
    total: {
      title: 'Volume column',
      defaultformat: 'compactnumber',
      type: 'data-provider-entity',
      provider: 'data_provider',
    },
    totalText: {
      title: 'Volume text',
      defaultformat: 'compactnumber',
      static: true,
    },
    totalUnit: {
      title: 'Volume unit',
      defaultformat: 'compactnumber',
      static: true,
    },
    data1Text: {
      title: 'Data 1 text',
      defaultformat: 'compactnumber',
      static: true,
    },
    data1Quantity: {
      title: 'Data 1 quantity',
      defaultformat: 'compactnumber',
      static: true,
    },
    data2Text: {
      title: 'Data 2 text',
      defaultformat: 'compactnumber',
      static: true,
    },
    data2Quantity: {
      title: 'Data 2 quantity',
      defaultformat: 'compactnumber',
      static: true,
    },
  };

  return getSchemaWithDataQuery({ schema, connected_data_parameters });
};
