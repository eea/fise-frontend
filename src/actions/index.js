import {
  GET_FRONTPAGESLIDES,
  // SET_FOLDER_HEADER,
  GET_DEFAULT_HEADER_IMAGE,
  SET_FOLDER_TABS,
  GET_PARENT_FOLDER_DATA,
  GET_LOCALNAVIGATION,
  GET_CHART_DATA_FROM_VISUALIZATION,
  GET_NAVSITEMAP,
} from '~/constants/ActionTypes';

export function getFrontpageSlides() {
  return {
    type: GET_FRONTPAGESLIDES,
    request: {
      op: 'get',
      path: `/frontpage_slides?fullobjects`,
    },
  };
}

export function getDefaultHeaderImage() {
  return {
    type: GET_DEFAULT_HEADER_IMAGE,
    request: {
      op: 'get',
      path: `/default_header_image?fullobjects`,
    },
  };
}

export function getLocalnavigation(folder) {
  return {
    type: GET_LOCALNAVIGATION,
    request: {
      op: 'get',
      path: `${folder}/@localnavigation`,
    },
  };
}

// export function setFolderHeader(payload) {
//   const actualPayload = {};
//   for (const key in payload) {
//     if (payload[key] !== null && payload[key] !== undefined) {
//       actualPayload[key] = payload[key];
//     }
//   }

//   if (Object.keys(actualPayload)) {
//     return {
//       type: SET_FOLDER_HEADER,
//       payload: actualPayload,
//     };
//   }
//   return;
// }

export function setFolderTabs(payload) {
  return {
    type: SET_FOLDER_TABS,
    payload: payload,
  };
}

export function getParentFolderData(url) {
  return {
    type: GET_PARENT_FOLDER_DATA,
    request: {
      op: 'get',
      path: `/${url}?fullobjects`,
    },
  };
}

// export function getDataProviders() {
//   return {
//     type: GET_DATA_PROVIDERS,
//     request: {
//       op: 'get',
//       path: `/@mosaic-settings`,
//     },
//   };
// }

export function getChartDataFromVisualization(path) {
  return {
    type: GET_CHART_DATA_FROM_VISUALIZATION,
    request: {
      op: 'get',
      path,
    },
  };
}

export function getNavSiteMap(url, depth) {
  // Note: Depth can't be 0 in plone.restapi
  return {
    type: GET_NAVSITEMAP,
    request: {
      op: 'get',
      path: `${url}/@navigation?expand.navigation.depth=${depth || 3}`,
    },

  };
}