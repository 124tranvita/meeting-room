import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CenterContainer: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen min-w-sx flex items-center w">
      <div className="w-90% mx-auto">{children}</div>
    </div>
  );
};

export default CenterContainer;
