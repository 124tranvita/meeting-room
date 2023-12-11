import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { Button, Modal } from "../../common/components";
import DetailInfo from "./detail-info";
import EditEvtModal from "../edit-event-modal";
import { useEventContext } from "../../hooks";
import DeleteEvtModal from "../delete-event-modal";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const EventDetailModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { event } = useEventContext();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDelModal, setIsOpenDelModal] = useState(false);

  /** Handle open edit modal */
  const openEditModal = useCallback(() => {
    setIsOpenEditModal(true);
  }, []);

  /** Handle open delete modal */
  const openDelModal = useCallback(() => {
    setIsOpenDelModal(true);
  }, []);

  /** Handle close modal */
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  return (
    <Modal
      title="Event details"
      closeModal={closeModal}
      isOpen={isOpen}
      closeOnFocusOut
      buttonGroup={
        <>
          <Button
            type="submit"
            label="Edit"
            variant="primary"
            onClick={openEditModal}
          />
          <Button
            type="submit"
            label="Copy"
            variant="primary"
            onClick={() => {}}
          />
          <Button
            type="button"
            label="Delete"
            variant="danger"
            onClick={openDelModal}
          />
        </>
      }
    >
      <DetailInfo event={event} />
      <EditEvtModal isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} />
      <DeleteEvtModal
        isOpen={isOpenDelModal}
        setIsOpen={setIsOpenDelModal}
        setIsOpenDetailEvtModal={setIsOpen}
      />
    </Modal>
  );
};

export default EventDetailModal;
