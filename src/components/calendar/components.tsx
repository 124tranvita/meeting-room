import { FC } from "react";

type ViewControlBtnGroupProps = {
  viewState: string;
  goToMonthView: () => void;
  goToWeekView: () => void;
  goToDayView: () => void;
  handleSync: () => void;
};

export const ViewControlBtnGroup: FC<ViewControlBtnGroupProps> = ({
  viewState,
  goToMonthView,
  goToWeekView,
  goToDayView,
  handleSync,
}) => {
  return (
    <div className="inline-flex rounded-md" role="group">
      <button
        type="button"
        className={`${
          viewState === "month" ? "text-blue-500" : "text-gray-900 "
        } min-w-78px px-4 py-2 text-sm font-medium rounded-s-lg bg-white border border-gray-200 hover:bg-gray-100"  hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        onClick={goToMonthView}
      >
        Month
      </button>
      <button
        type="button"
        className={`${
          viewState === "week" ? "text-blue-500" : "text-gray-900"
        } min-w-78px px-4 py-2 text-sm font-medium  bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        onClick={goToWeekView}
      >
        Week
      </button>
      <button
        type="button"
        className={`${
          viewState === "day" ? "text-blue-500" : "text-gray-900"
        } min-w-78px px-4 py-2 text-sm font-medium  bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        onClick={goToDayView}
      >
        Day
      </button>
      <button
        type="button"
        className={` min-w-78px px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        onClick={handleSync}
      >
        Sync
      </button>
    </div>
  );
};

type ControlBtnGroupProps = {
  goToBack: () => void;
  goToNext: () => void;
  goToToday: () => void;
};

export const ControlBtnGroup: FC<ControlBtnGroupProps> = ({
  goToBack,
  goToNext,
  goToToday,
}) => {
  return (
    <div className="inline-flex rounded-md" role="group">
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium text-gray-900 rounded-s-lg bg-white border border-gray-200 hover:bg-gray-100"  hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        onClick={goToBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </button>
      <button
        type="button"
        className={` px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        onClick={goToToday}
      >
        Today
      </button>
      <button
        type="button"
        className={` px-4 py-2 text-sm font-medium text-gray-900  bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        onClick={goToNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>
    </div>
  );
};
