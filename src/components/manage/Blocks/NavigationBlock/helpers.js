/* PLUGINS */
import { isMatch } from 'lodash';
/* ROOT */
import { settings } from '~/config';
/* PLONE VOLTO */
import { getBaseUrl } from '@plone/volto/helpers';

export const isActive = (url, pathname) => {
  return (
    (url === '' && pathname === '/') ||
    (url !== '' && isMatch(pathname?.split('/'), url?.split('/')))
  );
};

export const getNavigationByParent = (items, parent) => {
  if (items && parent !== undefined && typeof parent === 'string') {
    const pathnameArray = removeValue(parent.split('/'), '');
    const location = pathnameArray;
    const depth = pathnameArray.length;
    if (!depth) {
      return items;
    }

    return deepSearch({
      inputArray: items,
      location,
      depth,
    });
  }
  return {};
};

const formatNavUrl = (nav) => {
  return nav.map((navItem) => ({
    ...navItem,
    url: navItem.url ? getBasePath(navItem.url) : '',
    items: navItem.items ? formatNavUrl(navItem.items) : false,
  }));
};

export const deepSearch = ({ inputArray = [], location, depth, start = 1 }) => {
  // if (inputArray[0]?.url?.contains('http')) {
  inputArray = formatNavUrl(inputArray);
  // }
  console.log('inputArray', inputArray);

  console.log('inputarrayafter', inputArray);
  for (let index = 0; index < inputArray.length; index++) {
    if (
      depth === 1 &&
      removeValue(inputArray[index].url?.split('/'), '')[start - 1] ===
        location[start - 1]
    ) {
      return inputArray[index] || {};
    }
    if (
      removeValue(inputArray[index].url?.split('/'), '')[start - 1] ===
      location[start - 1]
    ) {
      return deepSearch({
        inputArray: inputArray[index].items,
        location,
        depth: depth - 1,
        start: start + 1,
      });
    }
  }

  return null;
};

export function removeValue(arr) {
  if (!arr || arr.length === 0) return [];
  let what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

export function getBasePath(url) {
  return getBaseUrl(url)
    .replace(settings.apiPath, '')
    .replace(settings.internalApiPath, '');
}
