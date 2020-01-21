import React, { useState, useEffect } from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { Checkbox, Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Range, getTrackBackground } from 'react-range';
import area_chart from './area_chart';
import rd3 from 'react-d3-library';
const RD3Component = rd3.Component;

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const createCheckboxFacet = (data, facet) => {
  return Object.keys(data.facetsData[facet]).map(filter => {
    const label = capitalize(data.facetsData[facet][filter].name);
    const value = data.facetsData[facet][filter].name;
    const number = data.facetsData[facet][filter].number;
    const key = data.facetsData[facet][filter].id;
    return (
      <Checkbox
        className="checkbox"
        key={key}
        checked={data.selectedFilters[facet].includes(`&${facet}=${value}`)}
        value={value}
        name={facet}
        label={label}
        onChange={(event, checkbox) => {
          const query = `&${checkbox.name}=${checkbox.value}`;
          data.handleFilterSelected(checkbox, 'checkbox', query)
        }}
      />
    );
  });
};

const createMultiselectFacet = (data, facet) => {
  const [options, setOptions] = useState(Object.keys(data.facetsData[facet]).map(item => {
    return { key: data.facetsData[facet][item].id, text: data.facetsData[facet][item].name, value: data.facetsData[facet][item].name }
  }))
  return (
    <Dropdown
      placeholder="Type..."
      fluid
      multiple
      selection
      search
      allowAdditions
      options={options}
      value={data.selectedFilters[facet].split(`&${facet}=`).slice(1)}
      onChange={(event, { value }) => {
        let query = ''
        value.forEach(val => {
          query += `&${data.facets[facet].queryParams[0]}=${val}`
        })
        data.handleFilterSelected({ name: facet }, 'multiselect', query)
      }}
    />
  );
}

const createSliderFacet = (data, facet) => {
  const yearsRange = Object.keys(data.facetsData[facet]).map(item => parseInt(data.facetsData[facet][item].name));
  const areaChartData = Object.keys(data.facetsData[facet]).map(item => {
    return {
      x: parseInt(data.facetsData[facet][item].name),
      y: parseInt(data.facetsData[facet][item].number)
    }
  });

  const STEP = 1;
  const MIN = yearsRange[0];
  const MAX = yearsRange[yearsRange.length - 1];

  const [values, setValues] = useState([MIN, MAX]);
  const [areaChart, setAreaChart] = useState('');

  useEffect(() => {
    setAreaChart(area_chart(400, 200, areaChartData))
  })
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
      }}
      className="slider"
    >
      <RD3Component data={areaChart} />
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={values => setValues(values)}
        onFinalChange={values => {
          let query = ''
          if (values[0] > MIN || values[1] < MAX) {
            if (data.facets[facet].queryParams.length === 2) {
              query = `&${data.facets[facet].queryParams[0]}=${values[0]}&${data.facets[facet].queryParams[1]}=${values[1]}`
            } else if (data.facets[facet].queryParams.length === 1) {
              query = `&${data.facets[facet].queryParams}=${values[0]}__${values[1]}`
            }
          }
          data.handleFilterSelected({ name: facet }, 'slider', query)
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              marginTop: '0',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: values,
                  colors: ['#ccc', '#CD4200', '#ccc'],
                  min: MIN,
                  max: MAX
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '24px',
              width: '24px',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-34px',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: 'transparent'
              }}
            >
              {values[index]}
            </div>
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? '#CD4200' : '#CCC'
              }}
            />
          </div>
        )}
      />
    </div>
  );

}

const SearchFilters = ({ data }) => {
  let renderTopicsFacet, renderNutsLevelFacet, renderCountryMultiselectFacet, renderResultsFormatFacet, renderPublishedYearFacet, renderCollectionsRangeFacet;
  if (
    data.facetsData &&
    data.selectedFilters &&
    Object.keys(data.selectedFilters).length > 0
  ) {
    renderTopicsFacet = createCheckboxFacet(data, 'topic_category');
    renderNutsLevelFacet = createCheckboxFacet(data, 'nuts_level');
    renderResultsFormatFacet = createCheckboxFacet(data, 'resource_type');
    renderPublishedYearFacet = createSliderFacet(data, 'published_year');
    renderCollectionsRangeFacet = createSliderFacet(data, 'collections_range');
    renderCountryMultiselectFacet = createMultiselectFacet(data, 'country');
  } else {
    renderTopicsFacet = '';
    renderNutsLevelFacet = '';
    renderResultsFormatFacet = '';
    renderPublishedYearFacet = '';
    renderCollectionsRangeFacet = '';
    renderCountryMultiselectFacet = '';
  }

  return (
    <div className="filters-container">
      <BodyClass />
      <div className="filters-head">
        <h3 className="header">FILTERS</h3>
        <h5 className="clear-filters" onClick={data.handleClearFilters}>
          CLEAR
        </h5>
      </div>
      <div className="filters-area">
        <h3>Topics</h3>
        <div className="checkbox-area">{renderTopicsFacet}</div>
      </div>
      {data.id === 'portal' && (
        <div className="filters-area">
          <h3>Countries and regions</h3>
          {renderCountryMultiselectFacet}
        </div>
      )}
      <div className="filters-area">
        <h3>NUTS Level</h3>
        <div className="checkbox-area">{renderNutsLevelFacet}</div>
      </div>
      {data.id === 'portal' && (
        <div className="filters-area">
          <h3>Collection method</h3>
          <div className="checkbox-area collection">
            <div className="checkbox-column">
              <Checkbox
                className="checkbox"
                label="State of Europe's Forests"
              />
              <Checkbox
                className="checkbox"
                label="Forest Resource Assessment"
              />
            </div>
          </div>
          <div className="checkbox-area collection">
            <div className="checkbox-column">
              <Checkbox className="checkbox" label="Corine Land Cover" />
              <Checkbox className="checkbox" label="Forest Map / HRL Forest" />
              <Checkbox className="checkbox" label="Global Forest Watch" />
              <Checkbox
                className="checkbox"
                label="Maltese Planning Authority"
              />
            </div>
          </div>
        </div>
      )}
      <div className="filters-area">
        <h3>Published year</h3>
        {renderPublishedYearFacet}
      </div>
      <div className="filters-area">
        <h3>Collections range</h3>
        {renderCollectionsRangeFacet}
      </div>
      <div className="filters-area">
        <h3>Results Format</h3>
        <div className="checkbox-area">
          {renderResultsFormatFacet}
        </div>
      </div>
    </div>

  );
};

export default SearchFilters;
