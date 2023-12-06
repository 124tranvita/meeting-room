import { FC } from "react";
import { DetailText } from "../../common/components";
import { EntryEvent } from "../../common/model";
import { dateFormatter } from "../../utils/date-func";
import {
  getBookingType,
  getConfirmStatus,
  getRepeatType2,
} from "../../utils/utils";

type Props = {
  event: EntryEvent;
};

const DetailInfo: FC<Props> = ({ event }) => {
  return (
    <div className="w-full px-0 md:px-8">
      <DetailText
        label="Start time"
        value={dateFormatter(event.start, "hh:mm b - eeee, MMM dd yyyy")}
      />
      <DetailText label="Duration" value={event.duration || ""} />
      <DetailText
        label="End time"
        value={dateFormatter(event.end, "hh:mm b - eeee, MMM dd yyyy")}
      />
      <DetailText label="Room" value={event.rooms.join(",")} />
      <DetailText label="Last updated" value={event.lastUpdated || ""} />
      <DetailText label="Created by" value={event.createdBy || ""} />
      <DetailText label="Modified by" value={event.modifiedBy || ""} />
      <DetailText label="Type" value={getBookingType(event.type)} />
      <DetailText label="Description" value={event.description} />
      <DetailText
        label="Confirmation status"
        value={getConfirmStatus(event.confirmed)}
      />
      <DetailText
        label="Repeat type"
        value={getRepeatType2(event.repeatType)}
        isLast
      />
    </div>
  );
};

export default DetailInfo;
