/* REACT IMPORTS */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBasePath } from '~/helpers';
import { Dimmer, Loader } from 'semantic-ui-react';

const RedirectView = (props) => {
  const history = useHistory();
  const [mounted, setMounted] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const currentPage = props.content?.['@id'];
  const redirectPage = props.content?.items?.[0]?.['@id'];
  console.log('in redirect', props.content, redirectPage);
  useEffect(() => {
    setMounted(true);
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (redirect) {
      history.push(getBasePath(redirectPage));
    }
  }, [redirect]);

  if (mounted && !redirect && !props.navigation.loading) {
    if (redirectPage) {
      const currentPath = getBasePath(currentPage);
      const redirectPath = getBasePath(redirectPage);
      if (currentPath !== redirectPath) {
        setRedirect(true);
      }
    }
  }

  return (
    <Dimmer active inverted className="redirect-loader">
      <Loader inverted>European Environment Agency</Loader>
    </Dimmer>
  );
};

export default connect((state, props) => ({
  content:
    state.prefetch?.[state.router.location.pathname] || state.content.data,
  navigation: state.navigation,
}))(RedirectView);
