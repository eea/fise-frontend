
import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { settings } from '~/config';

const RssView = () => {
  const html = (
    <div>
      <p>RSS is a format to share data, defined in XML, that contains information about news and events.</p>
      <p>You have to use a RSS reader so that you can subscribe to our feed.</p>
      <p>You can find more information about RSS <a href="https://en.wikipedia.org/wiki/RSS" target="_blank">here</a> and you can check our feed <a href={settings.apiPath + '/news/RSS'} target="_blank">here</a>.</p>
    </div>
  )
  return (
    <Container>
      <Helmet title="RSS Feed" />
      { html }
    </Container>
  );
}

export default RssView;