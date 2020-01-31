import React from 'react';
import cookie from 'react-cookie';
import getUrls from 'get-urls';

const PrivacyProtection = ({ children, data, ...props }) => {
  console.log('privacy', data);
  const text = data.privacy_notification || '';

  console.log('urls', getUrls(text));
  // const domains = getUrls(text).map();

  return (
    <div className="privacy-protection" {...props}>
      {children}
    </div>
  );
};

export default PrivacyProtection;
