import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Form, FormikContext, useFormik } from "formik";
import { Button, Modal } from "../../common/components";
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  TextArea,
} from "../../common/components/formik";
import { dateFormatter, getDuration } from "../../utils/date-func";
import * as Constants from "../../common/constants";
import { getDayPulldownData, getRepeatType } from "../../utils/utils";
import { EntryEvent } from "../../common/model";
import { useEventContext } from "../../hooks";
import { ACT_SET_EVENT } from "../../context/eventContext/constants";
import { FormikProps } from "./type";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  startDt: Date;
  endDt: Date;
};

const AddEvtModal: FC<Props> = ({ isOpen, setIsOpen, startDt, endDt }) => {
  const { events, dispatchEvent } = useEventContext();
  /** Formik initial values */
  const initialValues: FormikProps = useMemo(() => {
    return {
      name: "",
      description: "",
      startDt: dateFormatter(startDt, "yyyy-MM-dd'T'HH:mm"),
      endDt: dateFormatter(endDt, "yyyy-MM-dd'T'HH:mm"),
      allDay: false,
      rooms: [],
      type: Constants.BookingType.External,
      confirmed: "",
      repeatType: Constants.RepeatType.None,
      repInterval: "1",
      repEndDt: dateFormatter(new Date(), "yyyy-MM-dd"),
      skip: false,
      repDay0: "",
      repDay1: "",
      repDay2: "",
      repDay3: "",
      repDay4: "",
      repDay5: "",
      repDay6: "",
      monthlySelect: Constants.MonthlyType.Absolute,
      monthAbsolute: "",
      monthRelativeOrd: "",
      monthRelativeDay: "",
    };
  }, [endDt, startDt]);

  /** Form submit */
  const onSubmit = useCallback(
    (values: FormikProps) => {
      const event: EntryEvent = {
        id: values.name,
        title: values.name,
        start: new Date(values.startDt),
        end: new Date(values.endDt),
        description: values.description,
        allDay: values.allDay,
        rooms: values.rooms,
        type: values.type,
        confirmed: values.confirmed,
        repeatType: values.repeatType,
        duration: getDuration(values.startDt, values.endDt),
        lastUpdated: "",
        createdBy: "Username",
        modifiedBy: "",
      };

      dispatchEvent({
        type: ACT_SET_EVENT,
        payload: { events: [...events, event], event },
      });

      localStorage.setItem("events", JSON.stringify([...events, event]));
    },
    [dispatchEvent, events]
  );

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

  /** Handle submit form */
  const hanldSubmit = useCallback(() => {
    try {
      formikBag.submitForm();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }, [closeModal, formikBag]);

  return (
    <Modal
      title="Add Entry"
      closeModal={closeModal}
      isOpen={isOpen}
      isScroll
      buttonGroup={
        <>
          <Button
            type="submit"
            label="Add"
            variant="primary"
            onClick={hanldSubmit}
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
      <FormikContext.Provider value={formikBag}>
        <Form>
          <Input label="Brief description" name="name" type="text" />
          <TextArea label="Full description" name="description" />
          <Input label="Start" name="startDt" type="datetime-local" />
          <Input label="End" name="endDt" type="datetime-local" />
          <Checkbox name="allDay">
            <span>All day</span>
          </Checkbox>
          <Select
            label="Rooms"
            name="rooms"
            items={Constants.BOOKING_TYPE_ITEM}
            multiple
          />
          <Select
            label="Type"
            name="type"
            items={Constants.BOOKING_TYPE_ITEM}
          />
          <RadioGroup label="Confirmation status" name="confirmed">
            <Radio name="confirmed" value={Constants.ConfirmStatus.Confirmed}>
              <span>Confirmed</span>
            </Radio>
            <Radio name="confirmed" value={Constants.ConfirmStatus.Tentative}>
              <span>Tentative</span>
            </Radio>
          </RadioGroup>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/3">
              <RadioGroup label="Repeat type" name="repeatType">
                <Radio name="repeatType" value={Constants.RepeatType.None}>
                  <span>None</span>
                </Radio>
                <Radio name="repeatType" value={Constants.RepeatType.Daily}>
                  <span>Daily</span>
                </Radio>
                <Radio name="repeatType" value={Constants.RepeatType.Weekly}>
                  <span>Weekly</span>
                </Radio>
                <Radio name="repeatType" value={Constants.RepeatType.Monthly}>
                  <span>Monthly</span>
                </Radio>
                <Radio name="repeatType" value={Constants.RepeatType.Yearly}>
                  <span>Yearly</span>
                </Radio>
              </RadioGroup>
            </div>
            {/* Repeat configuration */}
            <div className="w-full md:w-2/3">
              {formikBag.values.repeatType !== Constants.RepeatType.None ? (
                <>
                  <Input
                    label={`Repeat every ${getRepeatType(
                      formikBag.values.repeatType
                    )}(s)`}
                    name="repInterval"
                    type="text"
                    size="small"
                  />
                  <Input
                    label="Repeat end date"
                    name="repEndDt"
                    type="date"
                    className="w-48"
                    size="small"
                  />
                  <Checkbox name="skip">
                    <span>Skip past conflicts</span>
                  </Checkbox>
                  {/* Display day selection only when Weekly is selected */}
                  {formikBag.values.repeatType ===
                    Constants.RepeatType.Weekly && (
                    <div className="flex">
                      <CheckboxGroup label="Repeat day" name="repDay">
                        {Constants.REP_DAY.map((item) => (
                          <span key={item.name} className="mr-2">
                            <Checkbox name={item.name}>
                              <span className="font-normal">{item.label}</span>
                            </Checkbox>
                          </span>
                        ))}
                      </CheckboxGroup>
                    </div>
                  )}
                  {/* Display month selection only when Monthly is selected */}
                  {formikBag.values.repeatType ===
                    Constants.RepeatType.Monthly && (
                    <div className="flex">
                      <RadioGroup label="Monthly settings" name="monthlySelect">
                        <div className="flex">
                          <Radio
                            name="monthlySelect"
                            value={Constants.MonthlyType.Absolute}
                          >
                            <span className="font-normal mr-3">On day</span>
                          </Radio>
                          <Select
                            name="monthAbsolute"
                            items={getDayPulldownData()}
                            size="small"
                            disabled={
                              formikBag.values.monthlySelect !==
                              Constants.MonthlyType.Absolute
                            }
                          />
                        </div>
                        <div className="flex">
                          <Radio
                            name="monthlySelect"
                            value={Constants.MonthlyType.Relative}
                          >
                            <span className="font-normal mr-3">On the</span>
                          </Radio>
                          <Select
                            name="monthRelativeOrd"
                            items={Constants.MONTH_RELATIVE_ORD}
                            size="small"
                            disabled={
                              formikBag.values.monthlySelect !==
                              Constants.MonthlyType.Relative
                            }
                          />
                          <Select
                            name="monthRelativeDay"
                            items={Constants.MONTH_RELATIVE_DAY}
                            size="small"
                            disabled={
                              formikBag.values.monthlySelect !==
                              Constants.MonthlyType.Relative
                            }
                          />
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Form>
      </FormikContext.Provider>
    </Modal>
  );
};

export default AddEvtModal;
