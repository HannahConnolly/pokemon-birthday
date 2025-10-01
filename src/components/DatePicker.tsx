import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    // <div className="p-4 border rounded-lg shadow-sm bg-white">
    <div className="flex w-full gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onDateChange}
        footer={selectedDate ? `You picked ${selectedDate.toLocaleDateString()}` : "Please pick a day."}
        className="w-full"
      />
    </div>
  );
};

export default DatePicker;  