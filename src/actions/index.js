/**
 * Add your actions here.
 * @module actions
 * @example
 * import {
 *   searchContent,
 * } from './search/search';
 *
 * export {
 *   searchContent,
 * };
 */

import {
  GET_FRONTPAGESLIDES,
  // SET_FOLDER_HEADER,
  GET_DEFAULT_HEADER_IMAGE,
  SET_FOLDER_TABS,
  GET_PARENT_FOLDER_DATA,
  GET_MOSAIC_SETTINGS,
  GET_DATA_FROM_PROVIDER,
  GET_LOCALNAVIGATION,
  GET_CHART_DATA_FROM_VISUALIZATION,
  CREATE_ATTACHMENT,
  GET_ALL_ATTACHMENTS,
  GET_ATTACHMENTS,
  DELETE_ATTACHMENT,
  UPDATE_ATTACHMENT,
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

export function getMosaicSettings() {
  return {
    type: GET_MOSAIC_SETTINGS,
    request: {
      op: 'get',
      path: `/@mosaic-settings`,
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

export function getDataFromProvider(path) {
  return {
    type: GET_DATA_FROM_PROVIDER,
    request: {
      op: 'get',
      path: path + '?expand=connector-data',
    },
  };
}

export function getChartDataFromVisualization(path) {
  return {
    type: GET_CHART_DATA_FROM_VISUALIZATION,
    request: {
      op: 'get',
      path,
    },
  };
}

export function createAttachment(url, content) {
  return {
    type: CREATE_ATTACHMENT,
    request: {
      op: 'post',
      path: url,
      data: content,
    },
  };
}

export function getAllAttachments(path) {
  return {
    type: GET_ALL_ATTACHMENTS,
    request: {
      op: 'get',
      path,
    },
  };
}

export function getAttachments(path, _type) {
  return {
    type: GET_ATTACHMENTS,
    request: {
      op: 'get',
      path,
      data: { container: _type },
    },
  };
}

export function deleteAttachment(path) {
  console.log('deleting attachment action', path);
  return {
    type: DELETE_ATTACHMENT,
    request: {
      op: 'del',
      path,
    },
  };
}

export function updateAttachment(path, data) {
  return {
    type: UPDATE_ATTACHMENT,
    request: {
      op: 'patch',
      path,
      data: {},
    },
  };
}
