import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import ResultCard from '~/components/theme/Search/ResultCard';
import RenderResultsBar from './RenderResultsBar.jsx';
import RenderPagination from './RenderPagination.jsx';
import ResultModal from './ResultModal';
import { useState } from 'react';


const RenderSearch = ({ data, pagination }) => {

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  let renderResultsBar, renderContent, renderFooter;
  renderResultsBar = <RenderResultsBar pagination={pagination} data={data} />;
  renderContent = '';
  if (data.items) {
    renderContent = data.items.map((item, index) => (
      <ResultCard item={item} key={index} handleItemSelect={()=>{setSelectedItem(item), setModalOpen(true)}} />
    ));
  }
  if (data.id === 'portal') {
    renderFooter = '';
  } else if (
    data.id === 'nfi_country' &&
    !data.selectedCountry &&
    data.facetsData &&
    data.facetsData.country &&
    Object.keys(data.facetsData.country).length > 0
  ) {
    renderFooter = '';
    const countries = Object.keys(data.facetsData.country).map(key => {
      return (
        <div className="country" key={key}>
          <a
            onClick={() =>
              data.handleCountrySelected(data.facetsData.country[key].name)
            }
          >
            {data.facetsData.country[key].name}
          </a>
          <span className="count">
            {' '}
            {'(' + data.facetsData.country[key].number + ')'}
          </span>
        </div>
      );
    });
    renderContent = (
      <div className="countries">
        <div className="countries-header">
          <h4>CHOOSE COUNTRY TO SHOW RESULTS</h4>
          <hr className="nfi-hr" />
        </div>
        <div className="countries-poll">{countries}</div>
        <hr className="nfi-hr" />
      </div>
    )
  } else if (
    data.id === 'nfi_region' &&
    !data.selectedRegion &&
    data.facetsData &&
    data.facetsData.regions &&
    Object.keys(data.facetsData.regions).length > 0
  ) {
    renderFooter = '';
    const regions = Object.keys(data.facetsData.regions).map(key => {
      return (
        <div className="country" key={key}>
          <a
            onClick={() =>
              data.handleCountrySelected(data.facetsData.regions[key].name)
            }
          >
            {data.facetsData.regions[key].name}
          </a>
          <span className="count">
            {' '}
            {'(' + data.facetsData.regions[key].number + ')'}
          </span>
        </div>
      );
    });
    renderContent = (
      <div className="countries">
        <div className="countries-header">
          <h4>CHOOSE REGION TO SHOW RESULTS</h4>
          <hr className="nfi-hr" />
        </div>
        <div className="countries-poll">{regions}</div>
        <hr className="nfi-hr" />
      </div>
    )
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
        <ResultModal item={selectedItem} open={modalOpen} handleClose={handleModalClose} />
      </section>
      <footer>{renderFooter}</footer>
    </article>
  );
};

export default RenderSearch;
