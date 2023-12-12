import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { useEventContext, useOutlookCalendarSync } from "../../hooks";
import { Button, Modal, Typography } from "../../common/components";
import { EntryEvent, initialEntryEvent } from "../../common/model";
import { ACT_SET_EVENT } from "../../context/eventContext/constants";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpenDetailEvtModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteEvtModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  setIsOpenDetailEvtModal,
}) => {
  const { event, events, dispatchEvent } = useEventContext();
  const { callCalendarApi } = useOutlookCalendarSync();

  const handleSubmit = useCallback(() => {
    const data = events.filter((item: EntryEvent) => item.id !== event.id);

    callCalendarApi({
      method: "DELETE",
      url: `/events/${event.id}`,
      headers: {
        accept: "*/*",
      },
    });

    dispatchEvent({
      type: ACT_SET_EVENT,
      payload: { events: [...data], event: initialEntryEvent },
    });

    setIsOpen(false);
    setIsOpenDetailEvtModal(false);
  }, [
    callCalendarApi,
    dispatchEvent,
    event.id,
    events,
    setIsOpen,
    setIsOpenDetailEvtModal,
  ]);

  /** Handle close modal */
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  return (
    <Modal
      title="Event details"
      closeModal={closeModal}
      isOpen={isOpen}
      buttonGroup={
        <>
          <Button
            type="submit"
            label="Delete"
            variant="primary"
            onClick={handleSubmit}
          />
          <Button
            type="button"
            label="Close"
            variant="danger"
            onClick={closeModal}
          />
        </>
      }
    >
      <Typography text="Delete this entry?" type="name" />
    </Modal>
  );
};

export default DeleteEvtModal;
