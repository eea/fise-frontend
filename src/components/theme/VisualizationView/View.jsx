import React from 'react';
import Helmet from 'react-helmet';
import { Container, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import Loadable from 'react-loadable';

const LoadablePlot = Loadable({
  loader: () => import('react-plotly.js'),
  loading() {
    return <div>Loading chart...</div>;
  },
});

const View = ({ content }) => {
  return (
    <Container id="page-visualization">
      <Helmet title={content.title} />
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.image && (
        <Image
          className="document-image"
          src={content.image.scales.thumb.download}
          floated="right"
        />
      )}
      {content.remoteUrl && (
        <span>
          The link address is:
          <a href={content.remoteUrl}>{content.remoteUrl}</a>
        </span>
      )}
      {content.text && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.text.data.replace(
              /a href="([^"]*\.[^"]*)"/g,
              `a href="${settings.apiPath}$1/download/file"`,
            ),
          }}
        />
      )}
      {content.visualization && (
        <div>
          <LoadablePlot
            config={{ displayModeBar: true }}
            {...content.visualization}
          />
        </div>
      )}
    </Container>
  );
};

export default View;
