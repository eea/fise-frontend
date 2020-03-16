import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ item }) => {
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
    <article key={item.id}>
      <span className="article-headline" title={item.title}>
        {item.title}
      </span>
      <div className={'expanded article-body'}>
        <div className={'meta-data'}>
          {item.date && (
            <div className="text-tab">
              <span className="format-text">Published: </span>
              <span className="format-type">{prettyDate(item.date)}</span>
            </div>
          )}
        </div>
        <div className={'article-content'}>
          {item.description && (
            <div className="block">
              <span className="description">{item.description}</span>
            </div>
          )}
          <div className="actions">
            <Link to={itemPath(item.id)}>Read article</Link>
          </div>
        </div>
      </div>

    </article>
  );
};

export default NewsItem;
