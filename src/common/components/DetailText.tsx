import { FC } from "react";
import { Typography } from ".";

type Props = {
  label: string;
  value: string;
  isLast?: boolean;
};

const DetailText: FC<Props> = ({ label, value, isLast = false }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full my-1">
        <span className="mr-4 w-full md:w-1/3">
          <Typography text={`${label}:`} type="name" size="normal" />
        </span>
        <span className="mr-4 w-full md:w-2/3">
          <Typography text={value} type="base" size="normal" />
        </span>
      </div>
      {!isLast && <hr />}
    </>
  );
};

export default DetailText;
