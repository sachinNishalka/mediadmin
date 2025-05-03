import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomCalendar({
  enabledDays = [],
  selectedDate,
  onDateSelect,
  disabled = false,
}) {
  // Convert selectedDate to Date object if it's a string or keep as is if it's already a Date
  const selected =
    selectedDate instanceof Date
      ? selectedDate
      : selectedDate
      ? new Date(selectedDate)
      : null;

  const filterDate = (date) => {
    if (disabled) return false;
    if (!enabledDays || enabledDays.length === 0) return false;
    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    return enabledDays.includes(dayName);
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selected}
        onChange={(date) => {
          if (date && filterDate(date)) {
            onDateSelect(date);
          }
        }}
        minDate={new Date()}
        inline
        filterDate={filterDate}
        disabled={disabled}
        dateFormat="MMMM d, yyyy"
        calendarClassName="border-0 shadow-lg"
      />
      <style>{`
        .calendar-container .react-datepicker {
          border: none;
          font-family: inherit;
        }
        .calendar-container .react-datepicker__day--selected {
          background-color: #4F46E5 !important;
          color: white !important;
        }
        .calendar-container .react-datepicker__day--selected:hover {
          background-color: #4338CA !important;
        }
        .calendar-container .react-datepicker__day:hover {
          background-color: #EEF2FF;
        }
        .calendar-container .react-datepicker__day--disabled {
          color: #D1D5DB;
        }
      `}</style>
    </div>
  );
}
