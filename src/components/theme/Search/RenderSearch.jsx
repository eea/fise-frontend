import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { FormattedMessage } from 'react-intl';
import ResultCard from '~/components/theme/Search/ResultCard';

const RenderSearch = ({ context }) => {
    return (
        <article id="content">
            <BodyClass className="search-page" />
            <header>
                <div className="results-bar">
                    <div className="results-count">
                        {context.items ? (
                            <FormattedMessage
                                id="Search produced: {items} results"
                                defaultMessage="Search produced: {items} results"
                                values={{
                                    items: <span>{context.items.length}</span>,
                                }}
                            />
                        ) : (
                                <FormattedMessage
                                    id="Search produced: 0 results"
                                    defaultMessage="Search produced: 0 results"
                                />
                            )}
                    </div>
                    <div className="max-results">
                        <p className="max-results-text">Results per page</p>
                        <select className="max-results-select">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                    </div>
                </div>
                {/* <SearchTags /> */}
            </header>
            <section id="content-core">
                {context.items.map(item => (
                    <ResultCard item={item} />
                ))}
            </section>
        </article>
    );
};

export default RenderSearch;
