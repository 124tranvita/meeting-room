import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Form, FormikContext, useFormik } from "formik";
import { Modal } from "../../common/components";
import {
  Checkbox,
  Input,
  Radio,
  Select,
  TextArea,
} from "../../common/components/formik";
import { dateFormatter } from "../../utils/date-func";
import * as Constants from "../../common/constants";
import { FormikProps } from "./type";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  startDt: Date;
  endDt: Date;
};

const AddEvtModal: FC<Props> = ({ isOpen, setIsOpen, startDt, endDt }) => {
  /** Formik initial values */
  const initialValues: FormikProps = useMemo(() => {
    return {
      startDt: dateFormatter(startDt, "yyyy-MM-dd'T'HH:mm"),
      endDt: dateFormatter(endDt, "yyyy-MM-dd'T'HH:mm"),
    };
  }, [endDt, startDt]);

  const onSubmit = useCallback(() => {}, []);

  /** Formik bag */
  const formikBag = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit,
  });

  /** Set formik initial values */
  useEffect(() => {
    formikBag.setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  /** Handle close modal */
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Modal title="Add Entry" closeModal={closeModal} isOpen={isOpen}>
      <FormikContext.Provider value={formikBag}>
        <Form>
          <Input label="Brief description" name="name" type="text" />
          <TextArea label="Full description" name="description" />
          <Input label="Start" name="startDt" type="datetime-local" />
          <Input label="End" name="endDt" type="datetime-local" />
          <Checkbox label="All day" name="allDay" />
          <Select label="Rooms" name="rooms" multiple>
            <option value={"room1"}>Room 1</option>
            <option value={"room2"}>Room 2</option>
          </Select>
          <Select label="Type" name="type">
            <option value={Constants.BookingType.External}>External</option>
            <option value={Constants.BookingType.Internal}>Internal</option>
          </Select>
          <Radio label="confirmed" name="confirmed" />
        </Form>
      </FormikContext.Provider>
    </Modal>
  );
};

export default AddEvtModal;
