import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Container } from 'semantic-ui-react';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import { map } from 'lodash';
import { settings, blocks } from '~/config';


const NewsItem = ({ item }) => {
  const blocksFieldname = getBlocksFieldname(item);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(item);
  console.log(hasBlocksData(item))
  console.log(hasBlocksData(item))
  const prettyDate = (time) => {
    let date = new Date(time),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

    return day_diff == 0 && (
      diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
  }

  const itemPath = (urlString) => {
    const url = new URL(urlString);
    return url.pathname.replace('/fise', '');
  }
  return (
    <article  id="page-document" key={item.id}>
      <Link className="article-headline" title={item.title} to={itemPath(item['id'])}>
        <h3>
          {item.title}
        </h3>
      </Link>
      <div className={'expanded article-body'}>
        <div style={{marginBottom: '1rem', marginTop: '-1rem'}} className={'meta-data'}>
          {item.date && (
            <div className="text-tab">
              <span className="format-text">Published: </span>
              <span className="format-type">{prettyDate(item.date)}</span>
            </div>
          )}
        </div>
        <div className='article-content'>
            {item.description && (
              <span className="description">{item.description}</span>
            )}
            {hasBlocksData(item) ? (
              <div>
                {map(item[blocksLayoutFieldname].items, block => {
                  const Block =
                    blocks.blocksConfig[
                    (item[blocksFieldname]?.[block]?.['@type'])
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
                      //   <div key={block}>
                      //     {intl.formatMessage(messages.unknownBlock, {
                      //       block: content[blocksFieldname]?.[block]?.['@type'],
                      //     })}
                      //   </div>
                      ''
                    );
                })}
                <div id="forest-metadata-slot">{''}</div>
              </div>
            ) : (
                <Container>
                  {item.image && (
                    <Image
                      className="document-image"
                      src={item.image.scales.thumb.download}
                      floated="right"
                    />
                  )}
                  {item.remoteUrl && (
                    <span>
                      The link address is:
                      <a href={item.remoteUrl}>{content.remoteUrl}</a>
                    </span>
                  )}
                  {item.text && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.text.data.replace(
                          /a href="([^"]*\.[^"]*)"/g,
                          `a href="${settings.apiPath}$1/download/file"`,
                        ),
                      }}
                    />
                  )}
                  <div id="forest-metadata-slot">{''}</div>
                </Container>
              )}
          </div>
      </div>
    </article>
  );
};

export default NewsItem;
