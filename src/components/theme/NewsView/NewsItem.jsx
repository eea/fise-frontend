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
  let date = new Date(time)
  const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit' }) 
  const  [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(date) 
    console.log(dtf.formatToParts(date))
    return `${mo} ${da} ${ye}`
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
                </Container>
              )}
          </div>
      </div>
    </article>
  );
};

export default NewsItem;
