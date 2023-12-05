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
import { Input } from "../../common/components/formik";
import { dateFormatter } from "../../utils/date-func";
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
    <Modal title="Add Event" closeModal={closeModal} isOpen={isOpen}>
      <FormikContext.Provider value={formikBag}>
        <Form>
          <Input label="Start" name="startDt" type="datetime-local" />
          <Input label="End" name="endDt" type="datetime-local" />
        </Form>
      </FormikContext.Provider>
    </Modal>
  );
};

export default AddEvtModal;
