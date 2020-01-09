import {
  GET_FRONTPAGESLIDES,
  // SET_FOLDER_HEADER,
  GET_DEFAULT_HEADER_IMAGE,
  SET_FOLDER_TABS,
  GET_PARENT_FOLDER_DATA,
  GET_LOCALNAVIGATION,
  GET_CHART_DATA_FROM_VISUALIZATION,
  GET_NAVSITEMAP,
  GET_KEYWORDS,
  GET_COUNTRY,
  GET_DATA_SET,
  GET_DATA_TYPE,
  GET_INFO_LEVEL,
  GET_LANGUAGE,
  GET_NUTS_LEVEL,
  GET_RESOURCE_TYPE,
  GET_TOPIC_CATEGORY,
  GET_PUBLICATION_YEARS
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
/**
 * KEYWORDS
 */
export function getKeywords() {
  return {
    type: GET_KEYWORDS,
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/keyword',
      external: true
    }
  }
}
/**
 * Facets GET list requests
 */
export function getCountry() {
  return {
    type: GET_COUNTRY,
    baseType: GET_COUNTRY,
    stateToChange: 'country',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/country',
      external: true
    }
  }
}

export function getDataSet() {
  return {
    type: GET_DATA_SET,
    baseType: GET_DATA_SET,
    stateToChange: 'dataSet',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/data-set',
      external: true
    }
  }
}

export function getDataType() {
  return {
    type: GET_DATA_TYPE,
    baseType: GET_DATA_TYPE,
    stateToChange: 'dataType',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/data-type',
      external: true
    }
  }
}

export function getInfoLevel() {
  return {
    type: GET_INFO_LEVEL,
    baseType: GET_INFO_LEVEL,
    stateToChange: 'countries',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/country',
      external: true
    }
  }
}

export function getLanguage() {
  return {
    type: GET_LANGUAGE,
    baseType: GET_LANGUAGE,
    stateToChange: 'language',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/language',
      external: true
    }
  }
}

export function getNutsLevel() {
  return {
    type: GET_NUTS_LEVEL,
    baseType: GET_NUTS_LEVEL,
    stateToChange: 'nutsLevel',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/nuts-level',
      external: true
    }
  }
}

export function getResourceType() {
  return {
    type: GET_RESOURCE_TYPE,
    baseType: GET_RESOURCE_TYPE,
    stateToChange: 'resourceType',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/resource-type',
      external: true
    }
  }
}

export function getTopicCategory() {
  return {
    type: GET_TOPIC_CATEGORY,
    baseType: GET_TOPIC_CATEGORY,
    stateToChange: 'topicCategory',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/facets/topic-category',
      external: true
    }
  }
}

export function getPublicationYears() {
  return {
    type: GET_PUBLICATION_YEARS,
    baseType: GET_PUBLICATION_YEARS,
    stateToChange: 'publicationYears',
    request: {
      op: 'get',
      path: 'http://localhost:8000/api/publication_years',
      external: true
    }
  }
}

