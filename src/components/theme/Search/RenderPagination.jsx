import React from 'react';
import { Pagination } from 'semantic-ui-react';


const RenderPagination = ({ pagination }) => {
    let renderPagination;
    if (pagination) {
        renderPagination = (
            <Pagination  
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                siblingRange={2}
                totalPages={Math.ceil(pagination.totalItems / pagination.selectedItemsPerPage) }
                onPageChange={pagination.updatePage}
            />
        )
    } else {
      renderPagination = ''
    }

    return renderPagination;
};

export default RenderPagination;
