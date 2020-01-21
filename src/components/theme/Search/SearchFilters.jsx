import React, { useState } from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { Checkbox, Dropdown, Grid, Segment, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Range, getTrackBackground } from 'react-range';

const countriesOptions = [
  {
    text: 'Romania',
    value: 'Romania',
  },
  {
    text: 'Bulgaria',
    value: 'Bulgaria',
  },
];

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

const createSliderFacet = (data, facet) => {
  const yearsRange = Object.keys(data.facetsData[facet]).map(item => parseInt(data.facetsData[facet][item].name));
  const countRange = Object.keys(data.facetsData[facet]).map(item => parseInt(data.facetsData[facet][item].number));

  const STEP = 1;
  const MIN = yearsRange[0];
  const MAX = yearsRange[yearsRange.length - 1];

  const minCount = countRange[0];
  const maxCount = countRange[countRange.length - 1];

  const [values, setValues] = useState([MIN, MAX]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={values => setValues(values)}
        onFinalChange={values => {
          let query = ''
          if (values[0] > MIN || values[1] < MAX) {
            if (data.facets[facet].facetNames.length === 2) {
              query = `&${data.facets[facet].facetNames[0]}=${values[0]}&${data.facets[facet].facetNames[1]}=${values[1]}`
            } else if (data.facets[facet].facetNames.length === 1) {
              query = `&${data.facets[facet].facetNames}=${values[0]}__${values[1]}`
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
                  colors: ['#ccc', '#548BF4', '#ccc'],
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
              height: '42px',
              width: '42px',
              borderRadius: '4px',
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
                top: '-28px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#548BF4'
              }}
            >
              {values[index]}
            </div>
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? '#548BF4' : '#CCC'
              }}
            />
          </div>
        )}
      />
    </div>
  );

}

const SearchFilters = ({ data }) => {
  let renderTopicsFacet, renderNutsLevelFacet, renderCollectionMethodFacet, renderResultsFormat, renderPublishedYear, renderCollectionsRange;
  if (
    data.facetsData &&
    data.selectedFilters &&
    Object.keys(data.selectedFilters).length > 0
  ) {
    renderTopicsFacet = createCheckboxFacet(data, 'topic_category');
    renderNutsLevelFacet = createCheckboxFacet(data, 'nuts_level');
    renderResultsFormat = createCheckboxFacet(data, 'resource_type');
    renderPublishedYear = createSliderFacet(data, 'published_year');
    renderCollectionsRange = createSliderFacet(data, 'collections_range');
  } else {
    renderTopicsFacet = '';
    renderNutsLevelFacet = '';
    renderResultsFormat = '';
    renderPublishedYear = '';
    renderCollectionsRange = '';
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
          <Dropdown
            compact={true}
            className="multiple-select"
            placeholder="Choose one or more"
            fluid
            multiple
            search
            selection
            options={countriesOptions}
          />
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
        {renderPublishedYear}
      </div>
      <div className="filters-area">
        <h3>Collections range</h3>
        {renderCollectionsRange}
      </div>
      <div className="filters-area">
        <h3>Results Format</h3>
        <div className="checkbox-area">
          {renderResultsFormat}
        </div>
      </div>
    </div>

  );
};

export default SearchFilters;
