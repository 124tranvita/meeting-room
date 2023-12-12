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
  Input,
  Radio,
  RadioGroup,
  Select,
  TextArea,
} from "../../common/components/formik";
import { dateFormatter } from "../../utils/date-func";
import { standardizationUpdateData } from "../../utils/response";
import * as Constants from "../../common/constants";
import { EntryEvent } from "../../common/model";
import { useEventContext, useOutlookCalendarSync } from "../../hooks";
import { FormikProps } from "./type";
import { ACT_SET_EVENT } from "../../context/eventContext/constants";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const EditEvtModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { event, events, dispatchEvent } = useEventContext();
  const { callCalendarApi } = useOutlookCalendarSync();

  console.log({ event });

  /** Formik initial values */
  const initialValues: FormikProps = useMemo(() => {
    return {
      name: event.title,
      description: event.description,
      startDt: dateFormatter(event.start, "yyyy-MM-dd'T'HH:mm"),
      endDt: dateFormatter(event.end, "yyyy-MM-dd'T'HH:mm"),
      allDay: event.allDay,
      rooms: event.rooms,
      type: event.type,
      confirmed: event.confirmed,
      // repeatType: event.repeatType,
      // repInterval: "1",
      // repEndDt: dateFormatter(new Date(), "yyyy-MM-dd"),
      // skip: false,
      // repDay0: "",
      // repDay1: "",
      // repDay2: "",
      // repDay3: "",
      // repDay4: "",
      // repDay5: "",
      // repDay6: "",
      // monthlySelect: Constants.MonthlyType.Absolute,
      // monthAbsolute: "",
      // monthRelativeOrd: "",
      // monthRelativeDay: "",
    };
  }, [event]);

  /** Form submit */
  const onSubmit = useCallback(
    (values: FormikProps) => {
      const updated: EntryEvent = {
        ...event,
        id: values.name,
        title: values.name,
        start: new Date(values.startDt),
        end: new Date(values.endDt),
        description: values.description,
        allDay: values.allDay,
        rooms: values.rooms,
        type: values.type,
        confirmed: values.confirmed,
        lastUpdated: new Date().toISOString(),
        modifiedBy: "modify-user",
      };

      callCalendarApi({
        method: "PATCH",
        url: `/events/${event.id}`,
        headers: {
          accept: "*/*",
        },
        data: {
          originalStartTimeZone: values.startDt,
          originalEndTimeZone: values.endDt,
          responseStatus: {
            response: "none",
            time: new Date(),
          },
          recurrence: null,
          reminderMinutesBeforeStart: 99,
          isOnlineMeeting: true,
          onlineMeetingProvider: "teamsForBusiness",
          isReminderOn: true,
          hideAttendees: false,
          categories: ["Red category"],
        },
      });

      dispatchEvent({
        type: ACT_SET_EVENT,
        payload: {
          event: updated,
          events: standardizationUpdateData(updated, events),
        },
      });

      localStorage.setItem(
        "events",
        JSON.stringify(standardizationUpdateData(updated, events))
      );
    },
    [callCalendarApi, dispatchEvent, event, events]
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
      title="Edit Entry"
      closeModal={closeModal}
      isOpen={isOpen}
      buttonGroup={
        <>
          <Button
            type="submit"
            label="Update"
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
        </Form>
      </FormikContext.Provider>
    </Modal>
  );
};

export default EditEvtModal;

{
  /* Repeat configuration */
}
{
  /* <div className="w-full md:w-2/3">
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
   
  </> */
}

//  {/* Display day selection only when Weekly is selected */}
//  {formikBag.values.repeatType ===
//   Constants.RepeatType.Weekly && (
//   <div className="flex">
//     <CheckboxGroup label="Repeat day" name="repDay">
//       {Constants.REP_DAY.map((item) => (
//         <span key={item.name} className="mr-2">
//           <Checkbox name={item.name}>
//             <span className="font-normal">{item.label}</span>
//           </Checkbox>
//         </span>
//       ))}
//     </CheckboxGroup>
//   </div>
// )}

// {/* Display month selection only when Monthly is selected */}
// {formikBag.values.repeatType ===
//   Constants.RepeatType.Monthly && (
//   <div className="flex">
//     <RadioGroup label="Monthly settings" name="monthlySelect">
//       <div className="flex">
//         <Radio
//           name="monthlySelect"
//           value={Constants.MonthlyType.Absolute}
//         >
//           <span className="font-normal mr-3">On day</span>
//         </Radio>
//         <Select
//           name="monthAbsolute"
//           items={getDayPulldownData()}
//           size="small"
//           disabled={
//             formikBag.values.monthlySelect !==
//             Constants.MonthlyType.Absolute
//           }
//         />
//       </div>
//       <div className="flex">
//         <Radio
//           name="monthlySelect"
//           value={Constants.MonthlyType.Relative}
//         >
//           <span className="font-normal mr-3">On the</span>
//         </Radio>
//         <Select
//           name="monthRelativeOrd"
//           items={Constants.MONTH_RELATIVE_ORD}
//           size="small"
//           disabled={
//             formikBag.values.monthlySelect !==
//             Constants.MonthlyType.Relative
//           }
//         />
//         <Select
//           name="monthRelativeDay"
//           items={Constants.MONTH_RELATIVE_DAY}
//           size="small"
//           disabled={
//             formikBag.values.monthlySelect !==
//             Constants.MonthlyType.Relative
//           }
//         />
//       </div>
//     </RadioGroup>
//   </div>
// )}
