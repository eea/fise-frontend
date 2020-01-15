import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { FormattedMessage } from 'react-intl';
import ResultCard from '~/components/theme/Search/ResultCard';
import { Pagination } from 'semantic-ui-react';

const RenderSearch = ({ items, pagination }) => {
  let renderPagination, renderMaxResults, renderResultsCount;
  if (pagination) {
    renderPagination = (
      <Pagination
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        siblingRange={2}
        totalPages={Math.ceil(
          pagination.totalItems / pagination.selectedItemsPerPage,
        )}
        onPageChange={pagination.updatePage}
      />
    );
    const options = pagination.itemsPerPage.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));
    renderMaxResults = (
      <div className="max-results">
        <p className="max-results-text">Results per page</p>
        <select
          className="max-results-select"
          onChange={pagination.updateItemsPerPage}
        >
          {options}
        </select>
      </div>
    );
    renderResultsCount = (
      <FormattedMessage
        id="Search produced: {items} results"
        defaultMessage="Search produced: {items} results"
        values={{
          items: <span>{pagination.totalItems}</span>,
        }}
      />
    );
  } else {
    renderPagination = '';
    renderMaxResults = '';
    renderResultsCount = items ? (
      <FormattedMessage
        id="Search produced: {items} results"
        defaultMessage="Search produced: {items} results"
        values={{
          items: <span>{items.length}</span>,
        }}
      />
    ) : (
      <FormattedMessage
        id="Search produced: 0 results"
        defaultMessage="Search produced: 0 results"
      />
    );
  }

  return (
    <article id="content">
      <BodyClass className="search-page" />
      <header>
        <div className="results-bar">
          <div className="results-count">{renderResultsCount}</div>
          {renderMaxResults}
        </div>
        {/* <SearchTags /> */}
      </header>
      <section id="content-core">
        {items.map((item, index) => (
          <ResultCard item={item} key={index} />
        ))}
      </section>
      <footer>{renderPagination}</footer>
    </article>
  );
};

export default RenderSearch;
