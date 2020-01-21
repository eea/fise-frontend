import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const RenderResultsBar = ({ pagination, data }) => {
  let renderMaxResults, renderResultsCount, renderResultsBar;
  if (pagination) {
    const options = pagination.itemsPerPage.map((value, index) => <option key={index} value={value}>{value}</option>)
    renderMaxResults = (
      <div className="max-results">
          <p className="max-results-text">Results per page</p>
          <select className="max-results-select" onChange={pagination.updateItemsPerPage}>
            {options}
          </select>
      </div>
    )
    renderResultsCount = (
      <FormattedMessage
          id="Search produced: {items} results"
          defaultMessage="Search produced: {items} results"
          values={{
            items: <span>{pagination.totalItems}</span>,
          }}
      />
    )
  } else {
    renderMaxResults = ''
    renderResultsCount = data.items ?
      (
        <FormattedMessage
            id="Search produced: {items} results"
            defaultMessage="Search produced: {items} results"
            values={{
                items: <span>{data.items.length}</span>,
            }}
        />
      ) : (
        <FormattedMessage
          id="Search produced: 0 results"
          defaultMessage="Search produced: 0 results"
        />
      )
  }

  renderResultsBar = (
    <div className="header-content">
      <div className="results-bar">
          <div className="results-count">
            {renderResultsCount}
          </div>
          {renderMaxResults}
      </div>
      <hr className="nfi-hr" />
    </div>
  );

  if (data.id === 'nfi_country') {
    if (
      data.selectedCountry &&
      data.facetsData &&
      data.facetsData.country &&
      Object.keys(data.facetsData.country).length > 0
    ) {
      let countries = Object.keys(data.facetsData.country).map(key => {
        return { key: data.facetsData.country[key].id, text: data.facetsData.country[key].name, value: data.facetsData.country[key].name }
      })
      countries.unshift({ key: 0, text: 'No country', value: '' })
      renderResultsBar = (
        <div>
          <div className="results-bar mt-2 justify-space-between">
            <Dropdown
              onChange={(event, dropdown) => { data.handleCountrySelected(dropdown.value) } }
              value={data.selectedCountry}
              placeholder='State'
              search
              selection
              options={countries}
            />
            <div className="flex">
              <div className="results-count">
                {renderResultsCount}
              </div>
              <span className="divider"></span>
              {renderMaxResults}
            </div>
          </div>
          <hr className="nfi-hr" />
        </div>
      );
    } else if (!data.selectedCountry) {
      renderResultsBar = '';
    }
  } else if (data.id === 'nfi_region') {
    if (
      data.selectedRegion &&
      data.facetsData &&
      data.facetsData.regions &&
      Object.keys(data.facetsData.regions).length > 0
    ) {
      let regions = Object.keys(data.facetsData.regions).map(key => {
        return { key: data.facetsData.regions[key].id, text: data.facetsData.regions[key].name, value: data.facetsData.regions[key].name }
      })
      regions.unshift({ key: 0, text: 'No region', value: '' })
      renderResultsBar = (
        <div>
          <div className="results-bar mt-2 justify-space-between">
            <Dropdown
              onChange={(event, dropdown) => { data.handleCountrySelected(dropdown.value) } }
              value={data.selectedRegion}
              placeholder='State'
              search
              selection
              options={regions}
            />
            <div className="flex">
              <div className="results-count">
                {renderResultsCount}
              </div>
              <span className="divider"></span>
              {renderMaxResults}
            </div>
          </div>
          <hr className="nfi-hr" />
        </div>
      );
    } else if (!data.selectedRegion) {
      renderResultsBar = '';
    }
  }

  return renderResultsBar;
};

export default RenderResultsBar;
