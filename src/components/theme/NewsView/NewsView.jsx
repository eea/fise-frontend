import React, { useState } from 'react';
import { Helmet, BodyClass } from '@plone/volto/helpers';
import { Container, Dropdown, Menu, Pagination } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom'
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from 'volto-base/components/theme/LayoutProvider/WidthBasedLayoutProvider';
import downKey from '@plone/volto/icons/down-key.svg';
import rss from '@plone/volto/icons/rss.svg';

const getItems = (propsItems, type = null) => {
  return propsItems.map(item => ({
    id: item['@id'],
    date: item.effective,
    start: item.start,
    end: item.end,
    location: item.location,
    type: item['@type'],
    title: item.title,
    image: item.image ? item.image.download : null,
    description: item.description,
    text: item.text,
    topics: item.topics,
    blocks: item.blocks,
    blocks_layout: item.blocks_layout
  })).sort((a, b) => {
    return new Date(b.date) - new Date(a.date) 
  });
}

const getTitle = (propsLocation) => {
  const title = propsLocation.pathname.split('/')[1].toLowerCase()
  return {
    lowerCase: title,
    capitalized: title.charAt(0).toUpperCase() + title.slice(1)
  }
}

const NewsView = (props) => {
  const grid = {
    phone: 'twelve',
    tablet: 'twelve',
    desktop: 'twelve',
    widescreen: 'twelve'
  };
  const title = getTitle(props.location);
  const items = getItems(props.content.items, title.lowerCase);
  
  if (!items) return (<h1>{ title.capitalized }</h1>);

  const rssButton = (
    <Link className="rss-feed" to='/rss' color="teal">
      <span>Subscribe via RSS</span>
      <Icon name={rss} size="14px" />
    </Link>
  );

  const itemsByYear = {};
  const yearOptions = [];

  items.forEach(item => {
    let year;
    if (item.start) year = new Date(item.start).getFullYear();    //  For events
    else if (item.date) year = new Date(item.date).getFullYear(); //  For news
    if(!itemsByYear[year]) itemsByYear[year] = [];
    itemsByYear[year].push(item)
  })

  Object.keys(itemsByYear).sort((a, b) => (b - a)).forEach((year, index) => {
    yearOptions.push({key: index, text: year, value: year})
  })
  
  const [state, setState] = useState({
    selectedYear: yearOptions[0].value,
    pagination: {
      page: 1,
      selectedItemsPerPage: 2,
      totalItems: itemsByYear[yearOptions[0].value].length,
      itemsPerPage: [
        {key: 0, text: '2', value: 2},
        {key: 1, text: '10', value: 10},
        {key: 2, text: '25', value: 25}
      ],
    }
  })

  const onSelectedYearChange = (event, data) => {
    const selectedYear = data.value
    const pagination = {
      ...state.pagination,
      page: 1,
      totalItems: itemsByYear[data.value].length
    }
    setState({selectedYear, pagination})
  }

  const onPageChange = (event, data) => {
    const pagination = {
      ...state.pagination,
      page: data.activePage,
    }
    setState({
      selectedYear: state.selectedYear,
      pagination
    })
  }

  const onSelectedItemsPerPageChange = (event, data) => {
    const pagination = {
      ...state.pagination,
      selectedItemsPerPage: data.value,
    }
    setState({
      selectedYear: state.selectedYear,
      pagination
    })
  }

  return (
    <Container>
      <Helmet title={ title.capitalized } />
      <div className="news-wrapper-view">
        <div className="toolbar">
          Year: 
          <Dropdown
            value={state.selectedYear}
            options={yearOptions}
            onChange={onSelectedYearChange}
            selection
            compact
          />
          Items per page: 
          <Dropdown
            value={state.pagination.selectedItemsPerPage}
            options={state.pagination.itemsPerPage}
            onChange={onSelectedItemsPerPageChange}
            selection
            compact
          />
        </div>
        <div className={`${props.layout_type}-${grid[props.layout_type]}`}>
          { itemsByYear[state.selectedYear] && itemsByYear[state.selectedYear].map((item, index) => {
            if (
              index >= (state.pagination.page - 1) * state.pagination.selectedItemsPerPage
              && index < state.pagination.page * state.pagination.selectedItemsPerPage
            ) return (<NewsItem key={item.id} item={item}  />)
          })}
        </div>
        <Pagination
          activePage={state.page}
          totalPages={Math.ceil(state.pagination.totalItems / state.pagination.selectedItemsPerPage)}
          onPageChange={onPageChange}
        />
      </div>
    </Container>
  )
}

export default WidthBasedLayoutProvider(NewsView);