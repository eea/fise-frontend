import React from 'react';
import { Button } from 'semantic-ui-react';
import circleLeft from '@plone/volto/icons/circle-left.svg';
import circleRight from '@plone/volto/icons/circle-right.svg';
import check from '@plone/volto/icons/check.svg';
import { Icon } from '@plone/volto/components';

function PositionToolbar({ data, onChangeBlock, block }) {
  return (
    <div className="toolbar toolbar-bottom">
      <Button.Group>
        <Button basic disabled style={{ marginRight: '5px' }}>
          Position:
        </Button>
        <Button
          icon
          basic
          title="left"
          onClick={() =>
            onChangeBlock(block, {
              ...data,
              position: 'left',
            })
          }
        >
          <Icon
            name={data.position === 'left' ? check : circleLeft}
            size="24px"
          />
        </Button>
        <Button
          icon
          basic
          title="right"
          onClick={() =>
            onChangeBlock(block, {
              ...data,
              position: 'right',
            })
          }
        >
          <Icon
            name={data.position === 'right' ? check : circleRight}
            size="24px"
          />
        </Button>
      </Button.Group>
    </div>
  );
}

export default PositionToolbar;
