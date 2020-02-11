import React from 'react';
import { Pagination } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive'


const RenderPagination = ({ pagination }) => {
    let renderPagination;
    const isMobile = useMediaQuery({ maxDeviceWidth: 767 })
    if (pagination) {
        renderPagination = (
            <Pagination
                activePage={pagination.page}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={Math.ceil(pagination.totalItems / pagination.selectedItemsPerPage)}
                onPageChange={(event, data) => {
                    const tabContainer = document.querySelector('.search-page-content .tabs-container');
                    tabContainer.scrollIntoView({ behavior: "smooth" });
                    pagination.updatePage(event, data);
                }}
                boundaryRange={isMobile? 0:1}
                size={isMobile? 'small': ''}
                ellipsisItem={isMobile? null: undefined}
            />
            
        )
    } else {
        renderPagination = ''
    }

    return renderPagination;
};

export default RenderPagination;
