import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import ResultCard from '~/components/theme/Search/ResultCard';
import RenderResultsBar from './RenderResultsBar.jsx';
import RenderPagination from './RenderPagination.jsx';


const RenderSearch = ({ data, pagination }) => {
    let renderResultsBar, renderContent, renderFooter;
    renderResultsBar = (<RenderResultsBar pagination={pagination} data={data} />);
    if (data.id === 'portal') {
        renderContent = data.items.map((item, index) => (
          <ResultCard item={item} key={index} />
        ))
        renderFooter = ''
    } else if (data.id === 'nfi') {
        renderContent = data.items.map((item, index) => (
          <ResultCard item={item} key={index} />
        ))
        if (!data.selectedCountry && data.facets && data.facets.country && Object.keys(data.facets.country).length > 0) {
          renderContent = Object.keys(data.facets.country).map(key => {
              return (
                <div className="country" key={key}>
                  <a onClick={() => data.handleCountrySelected(data.facets.country[key].name)}>{data.facets.country[key].name}</a>
                  <span className="count"> {'(' + data.facets.country[key].number + ')'}</span>
                </div>
              )
          })
          renderContent = (
            <div className="countries">
              <div className="countries-header">
                <h4>CHOOSE COUNTRY TO SHOW RESULTS</h4>
                <hr className="nfi-hr" />
              </div>
              <div className="countries-poll">{renderContent}</div>
              <hr className="nfi-hr" />
            </div>
          )
          renderFooter = ''
        } else if (data.selectedCountry && data.facets && data.facets.country && Object.keys(data.facets.country).length > 0) {
          renderFooter = (<RenderPagination pagination={pagination} />)
        }
    }

    return (
        <article id="content">
            <BodyClass className="search-page" />
            <header>
                {renderResultsBar}
                {/* <SearchTags /> */}
            </header>
            <section id="content-core" className="mt-2">
                { renderContent }
            </section>
            <footer>
                { renderFooter }
            </footer>
        </article>
    );
};

export default RenderSearch;
