import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container } from 'semantic-ui-react';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { getBasePath } from '~/helpers';

const NewsItem = ({ item }) => {
  const blocksFieldname = getBlocksFieldname(item);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(item);

  const prettyDate = (time) => {
    let date = new Date(time);
    const dtf = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const [{ value: da }, , { value: mo }, , { value: ye }] = dtf.formatToParts(
      date,
    );
    return `${da} ${mo} ${ye}`;
  };

  const prettyDateTime = (time) => {
    const dtf = Intl.DateTimeFormat('en-GB', {
      // weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'Europe/Copenhagen',
      timeZoneName: 'short',
    });

    const [
      { value: da },
      ,
      { value: mo },
      ,
      { value: ye },
      ,
      { value: hh },
      ,
      { value: mm },
      ,
      { value: tz },
      ,
    ] = dtf.formatToParts(new Date(time));

    return `${da} ${mo} ${ye} ${hh}:${mm} ${tz}`;
  };

  return (
    <article key={item.id}>
      <div className={'expanded article-body'}>
        <div className="article-header">
          <div className="content">
            <Link
              className="article-headline"
              title={item.title}
              to={getBasePath(item['@id'])}
            >
              <h3>{item.title}</h3>
            </Link>
            <div className={'meta-data'}>
              {item.date && !(item.start && item.end) && (
                <div className="text-tab">
                  <span className="format-text">Published: </span>
                  <span className="format-type">{prettyDate(item.date)}</span>
                </div>
              )}
              {item.start && item.end && (
                <div className="event-dates">
                  <div className="text-tab">
                    <span className="format-text">Starting: </span>
                    <span className="format-type">
                      {prettyDateTime(item.start)}
                    </span>
                  </div>
                  <div className="text-tab">
                    <span className="format-text">Ending: </span>
                    <span className="format-type">
                      {prettyDateTime(item.end)}
                    </span>
                  </div>
                </div>
              )}
              {item.location && (
                <div className="text-tab">
                  <span className="format-text">Location: </span>
                  <span className="format-type">{item.location}</span>
                </div>
              )}
              {item.year && (
                <div className="text-tab">
                  <span className="format-text">Year: </span>
                  <span className="format-type">{item.year}</span>
                </div>
              )}
            </div>
          </div>
          {item.image && (
            <div className="content">
              <Image
                className="document-image"
                src={item.image.scales.thumb.download}
              />
            </div>
          )}
        </div>
        <div className="article-content">
          {item.description && (
            <span className="description">{item.description}</span>
          )}
          {hasBlocksData(item) ? (
            <div>
              {item?.[blocksLayoutFieldname]?.items?.map((block) => {
                const Block =
                  config.blocks.blocksConfig[
                    item[blocksFieldname]?.[block]?.['@type']
                  ]?.['view'] || null;
                return Block !== null &&
                  item[blocksFieldname][block]['@type'] !== 'title' ? (
                  <Block
                    key={block}
                    id={block}
                    properties={item}
                    data={item[blocksFieldname][block]}
                  />
                ) : (
                  ''
                );
              })}
            </div>
          ) : (
            <Container>
              {item.remoteUrl && (
                <span>
                  The link address is:
                  <a href={item.remoteUrl}>{item.remoteUrl}</a>
                </span>
              )}
              {item.text && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.text.data.replace(
                      /a href="([^"]*\.[^"]*)"/g,
                      `a href="${config.settings.apiPath}$1/download/file"`,
                    ),
                  }}
                />
              )}
            </Container>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsItem;
