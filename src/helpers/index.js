import { settings } from '~/config';
import { getBaseUrl } from '@plone/volto/helpers';

export function getBasePath(url) {
  return getBaseUrl(url)
    .replace(settings.apiPath, '')
    .replace(settings.internalApiPath, '');
}
