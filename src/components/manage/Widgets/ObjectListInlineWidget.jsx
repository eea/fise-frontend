import { Accordion, Button, Segment, Modal, Grid } from 'semantic-ui-react';

import React, { useState } from 'react';
import { Icon as VoltoIcon, FormFieldWrapper } from '@plone/volto/components';
import { DragDropList } from '@eeacms/volto-blocks-form/components';
import ObjectWidget from './ObjectWidget';

import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import pencilSVG from '@plone/volto/icons/pencil.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { v4 as uuid } from 'uuid';

const ObjectListInlineWidget = (props) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const {
    id,
    schema,
    value = [],
    onChange,
    schemaExtender,
    defaultData = {},
  } = props;

  const openModal = (index) => {
    setOpen(true);
    setActive(index);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <>
      <FormFieldWrapper {...props} className="objectlist-inline-widget">
        <div>
          <Button
            compact
            onClick={() =>
              onChange(id, [
                ...value,
                {
                  '@id': uuid(),
                  ...defaultData,
                },
              ])
            }
          >
            <VoltoIcon name={addSVG} size="12px" />
            {`Add ${schema.title}`}
          </Button>
        </div>
      </FormFieldWrapper>
      <DragDropList
        childList={value.map((o) => [o['@id'], o])}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          const first = value[source.index];
          const second = value[destination.index];
          value[destination.index] = first;
          value[source.index] = second;
          onChange(id, value);
          return true;
        }}
      >
        {({ child, childId, index, draginfo }) => {
          return (
            <div
              ref={draginfo.innerRef}
              {...draginfo.draggableProps}
              key={childId}
            >
              <Segment.Group raised>
                <Accordion key={index} fluid styled>
                  <Accordion.Title>
                    <button
                      style={{
                        visibility: 'visible',
                        display: 'inline-block',
                      }}
                      {...draginfo.dragHandleProps}
                      className="drag handle"
                    >
                      <VoltoIcon name={dragSVG} size="18px" />
                    </button>

                    {`${schema.title} #${index + 1}`}
                    <div>
                      <button
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => {
                          openModal(index);
                        }}
                      >
                        <VoltoIcon name={pencilSVG} size="16px" />
                      </button>
                      <button
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          onChange(
                            id,
                            value.filter((v, i) => i !== index),
                          );
                        }}
                      >
                        <VoltoIcon name={deleteSVG} size="16px" />
                      </button>
                    </div>
                  </Accordion.Title>
                  {child.title ? (
                    <Accordion.Content active>
                      <Segment>
                        <p>{child.title}</p>
                      </Segment>
                    </Accordion.Content>
                  ) : (
                    ''
                  )}
                </Accordion>
              </Segment.Group>
            </div>
          );
        }}
      </DragDropList>
      <Modal open={open} onClose={closeModal} className="object-list-modal">
        <Modal.Header>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            <VoltoIcon name={clearSVG} size="16px" />
          </button>
        </Modal.Header>
        <Modal.Content scrolling>
          <ObjectWidget
            id={`${id}-${active}`}
            key={`ow-${id}-${active}`}
            schema={
              schemaExtender ? schemaExtender(schema, value[active]) : schema
            }
            value={value[active]}
            onChange={(fi, fv) => {
              const newvalue = value.map((v, i) => (i !== active ? v : fv));
              onChange(id, newvalue);
            }}
          />
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
};
export default ObjectListInlineWidget;
