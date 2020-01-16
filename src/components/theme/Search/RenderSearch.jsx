import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { FormattedMessage } from 'react-intl';
import ResultCard from '~/components/theme/Search/ResultCard';
import RenderPagination from './RenderPagination.jsx';
import { Dropdown } from 'semantic-ui-react'


const RenderSearch = ({ data, pagination }) => {
    let renderMaxResults, renderResultsCount, renderResultsBar, renderContent, renderFooter;
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
        <div className="results-bar">
            <div className="results-count">
            {renderResultsCount}
            </div>
            {renderMaxResults}
        </div>
    )

    if (data.id === 'portal') {
        renderContent = data.items.map((item, index) => (
            <ResultCard item={item} key={index} />
        ))
        
        renderFooter = ''
    } else if (data.id === 'nfi') {
        renderContent = data.items.map((item, index) => (
            <ResultCard item={item} key={index} />
        ))
        if (!data.selectedCountry && data.facets.country && Object.keys(data.facets.country).length > 0) {
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
                </div>
            )
            renderResultsBar = ''
            renderFooter = ''
        } else if (data.selectedCountry && data.facets.country && Object.keys(data.facets.country).length > 0) {
            let countries = Object.keys(data.facets.country).map(key => {
                return { key: data.facets.country[key].id, text: data.facets.country[key].name, value: data.facets.country[key].name }
            })
            countries.unshift({ key: 0, text: 'No country', value: '' })
            renderResultsBar = (
                <div className="results-bar">
                    <Dropdown onChange={(event, dropdown) => { data.handleCountrySelected(dropdown.value) } } defaultValue={data.selectedCountry} placeholder='State' search selection options={countries} />
                    <div className="results-count">
                    {renderResultsCount}
                    </div>
                    {renderMaxResults}
                </div>
            )
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
            <section id="content-core">
                { renderContent }
            </section>
            <footer>
                { renderFooter }
            </footer>
        </article>
    );
};

export default RenderSearch;
