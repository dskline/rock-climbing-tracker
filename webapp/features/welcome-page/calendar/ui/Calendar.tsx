import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Session } from "@/features/exercise-recording/types";
import React from "react";

type Props = {
  sessions: Session[];
};
export const Calendar = (props: Props) => {
  const values = [];

  if (props.sessions?.length > 0) {
    // get the first date
    let currentDate = getDate(props.sessions[0]);
    let count = 1;
    let total = 1;

    for (let i = 1; i < props.sessions.length; i++) {
      total++;
      let nextDate = getDate(props.sessions[i]);
      if (nextDate === currentDate) {
        count++;
      } else {
        values.push({ date: currentDate, count });
        currentDate = nextDate;
        count = 1;
      }
    }
    values.push({ date: currentDate, count });
  }

  const oneMonthAfterToday = new Date();
  oneMonthAfterToday.setMonth(oneMonthAfterToday.getMonth() + 1);

  return (
    <div>
      <CalendarHeatmap
        startDate={
          props.sessions.length > 0 ? getDate(props.sessions[0]) : new Date()
        }
        endDate={oneMonthAfterToday}
        values={values}
        transformDayElement={(element, value) => {
          if (value?.count > 0) {
            return React.cloneElement(element, {
              style: {
                fill: `hsl(155 65% ${26 / (value.count / 5)}%)`,
              },
            });
          }
          return element;
        }}
      />
    </div>
  );
};

// gets a date in the format of YYYY-MM-DD
const getDate = (session: Session) => {
  return session.start_time.split("T")[0];
};
