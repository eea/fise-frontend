import React, { useState } from 'react';

const RefreshView = () => {
  if (__SERVER__) {
    return '';
  } else {
    window.location.reload();
  }
  return '';
};

export default RefreshView;
