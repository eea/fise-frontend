import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import ResultCard from '~/components/theme/Search/ResultCard';
import RenderResultsBar from './RenderResultsBar.jsx';
import RenderPagination from './RenderPagination.jsx';
import ResultModal from './ResultModal';
import { useState } from 'react';

const renderCountriesList = (countries, handleClick) => {
  return Object.keys(countries).map(key => {
    return (
      <div className="country" key={key}>
        <a
          onClick={() =>
            handleClick(countries[key].name)
          }
        >
          {countries[key].name}
        </a>
        <span className="count">
          {' '}
          {'(' + countries[key].number + ')'}
        </span>
      </div>
    );
  });
}

const renderPoll = (title, countriesList) => {
  return (
    <div className="countries">
      <div className="countries-header">
        <h4>{title}</h4>
        <hr className="nfi-hr" />
      </div>
      <div className="countries-poll">{countriesList}</div>
      <hr className="nfi-hr" />
    </div>
  )
}

const RenderSearch = ({ data, pagination }) => {
  let renderResultsBar, renderContent, renderFooter;
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  // DEFAULT
  renderResultsBar = <RenderResultsBar pagination={pagination} data={data} />;
  renderContent = '';
  renderFooter = '';
  if (data.items) {
    renderContent = data.items.map((item, index) => (
      <ResultCard
        item={item}
        key={index}
        handleItemSelect={()=>{setSelectedItem(item), setModalOpen(true)}}
        isPortal={data.id === "portal"? true : false}
      />
    ));
  }
  //  CUSTOM
  if (
    data.id === 'nfi_country' &&
    data.handleCountrySelected &&
    !data.selectedCountry &&
    data.facetsData &&
    data.facetsData.country &&
    Object.keys(data.facetsData.country).length > 0
  ) {
    renderContent = renderPoll(
      'CHOOSE COUNTRY TO SHOW RESULTS',
      renderCountriesList(data.facetsData.country, data.handleCountrySelected)
    );
  } else if (
    data.id === 'nfi_region' &&
    data.handleCountrySelected &&
    !data.selectedRegion &&
    data.facetsData &&
    data.facetsData.regions &&
    Object.keys(data.facetsData.regions).length > 0
  ) {
    renderContent = renderPoll(
      'CHOOSE REGION TO SHOW RESULTS',
      renderCountriesList(data.facetsData.regions, data.handleCountrySelected)
    );
  } else if (pagination && ((data.id === 'nfi_country' && data.selectedCountry) || (data.id === 'nfi_region' && data.selectedRegion))) {
    renderFooter = <RenderPagination pagination={pagination} />;
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <article id="content">
      <BodyClass className="search-page" />
      <header>
        {renderResultsBar}
        {/* <SearchTags /> */}
      </header>
      <section id="content-core" className="mt-2">
        {renderContent}
        {data && data.handleKeywordChange && data.selectedKeywords && (
          <ResultModal item={selectedItem} open={modalOpen} handleClose={handleModalClose} handleKeywordChange={data.handleKeywordChange} selectedKeywords={data.selectedKeywords} />
        )}
      </section>
      <footer>{renderFooter}</footer>
    </article>
  );
};

export default RenderSearch;
