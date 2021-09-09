import config from '@plone/volto/registry';
import { getBaseUrl } from '@plone/volto/helpers';
import { setConnectedDataParameters } from '@eeacms/volto-datablocks/actions';

export function getBasePath(url) {
  return getBaseUrl(url)
    .replace(config.settings.apiPath, '')
    .replace(config.settings.internalApiPath, '')
    .replace('https://demo-forest.devel4cph.eea.europa.eu/', '');
}

export const objectHasData = (obj) => {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
};

export const getSchemaWithDataQuery = (props) => {
  if (!props.schema) return {};
  let schemaWithDataQuery = {};
  Object.keys(props.schema).forEach((element) => {
    if (props.schema[element].type === 'data-provider') {
      if (
        !objectHasData(
          props?.connected_data_parameters?.byProviderPath?.[props.path],
        ) &&
        !objectHasData(
          props?.connected_data_parameters?.byContextPath?.[props.path],
        )
      ) {
        const dataQuery = {};
        dataQuery[element + '_data_query'] = {
          defaultformat: 'compactnumber',
          type: 'data-query',
        };
        schemaWithDataQuery[element] = props.schema[element];
        schemaWithDataQuery = { ...schemaWithDataQuery, ...dataQuery };
      }
    }
    schemaWithDataQuery[element] = props.schema[element];
  });
  return schemaWithDataQuery;
};

export function getLocation(href) {
  var match = href.match(
    /^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
  );
  return (
    match && {
      href: href,
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7],
    }
  );
}

export function samePath(url, path) {
  // returns true if the router path is equal to the given url path
  const parsed = getLocation(url);
  const clean = url
    .replace(config.settings.apiPath, '')
    .replace(config.settings.internalApiPath, '')
    .replace(parsed.hash, '')
    .replace(parsed.search, '')
    .replace(/\/$/, '');

  const cleanPath = path.replace(/\/$/, '');
  return clean === cleanPath;
}

export const updateConnectedDataParameters = (props) => {
  props.schema &&
    Object.keys(props.schema).forEach((element) => {
      if (props.schema[element].type === 'data-query') {
        if (
          props?.newData?.columns?.[element] &&
          (props?.newData?.columns?.[element]?.value?.i !==
            props?.data?.columns?.[element]?.value?.i ||
            props?.newData?.columns?.[element]?.value?.v !==
              props?.data?.columns?.[element]?.value?.v)
        ) {
          const path = getBasePath(props.pathname);
          const byPath = props?.connected_data_parameters?.byPath;
          const connected_data_parameters =
            (byPath?.[path]?.override?.length > 0 &&
              byPath?.[path]?.override?.[`${props.id}_${element}`]) ||
            null;
          if (
            connected_data_parameters === null ||
            connected_data_parameters?.i !==
              props?.newData?.columns?.[element]?.value?.i ||
            connected_data_parameters?.v?.join(',') !==
              props?.newData?.columns?.[element]?.value?.v
          ) {
            props.dispatch(
              setConnectedDataParameters(
                path.replace('/edit', ''),
                props?.newData?.columns?.[element]?.value,
                `${props.id}_${element}`,
              ),
            );
          }
        }
      }
    });
};
