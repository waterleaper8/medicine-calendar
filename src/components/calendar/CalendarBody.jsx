import React, { useContext, useEffect, useState } from "react";
import DateCheckBox from "./DateCheckBox";
import { app } from "../api/firebase";
import { UserDataContext } from "../../provider/UserDataProvider";

const CalendarBody = (props) => {
  const db = app.firestore();
  const { year, month } = props;
  const [checkedItems, setCheckedItems] = useState([]);
  const { uid, checkedTimes } = useContext(UserDataContext);

  // カレンダー作成関連
  const getCalendarHead = (year, month) => {
    const dates = [];
    const lastDay = new Date(year, month, 0).getDate();
    const lastWeekNum = new Date(year, month, 1).getDay();
    for (let i = 0; i < lastWeekNum; i++) {
      // 30
      // 29, 30
      // 28, 29, 30
      dates.unshift({
        date: lastDay - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  };
  const getCalendarBody = (year, month) => {
    const dates = []; //date: 日付, day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    const today = new Date();
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  };
  const getCalendarTail = (year, month) => {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  };
  const dates = [
    ...getCalendarHead(year, month),
    ...getCalendarBody(year, month),
    ...getCalendarTail(year, month),
  ];
  const weeks = [];
  const weeksCount = dates.length / 7;
  for (let i = 0; i < weeksCount; i++) {
    weeks.push(dates.splice(0, 7));
  }

  // 初期読み込み時、firestoreからデータを読み込んでsetCheckeditemsを実行
  useEffect(() => {
    const timer = setTimeout(() => {
      let docRef = db.collection("checkedDateTimeList").doc(uid);
      docRef.get().then((doc) => {
        if (doc.data().datetimes) {
          setCheckedItems(doc.data().datetimes);
          console.log("Fetch Firestore's Items.");
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [db, uid]);

  // checkedItemsに変更が発生したらfirestoreに書き込み;
  useEffect(() => {
    const timer = setTimeout(() => {
      let docRef = db.collection("checkedDateTimeList").doc(uid);
      docRef.get().then((doc) => {
        if (doc.data().datetimes) {
          docRef.update({
            datetimes: checkedItems,
          });
        } else {
          docRef.set({
            datetimes: checkedItems,
          });
        }
      });
      console.log("Firestore checkedItems update");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [checkedItems, db, uid]);

  const handleChange = (e) => {
    let id = e.target.id;
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => ![id].includes(item)));
    } else {
      setCheckedItems([...checkedItems, e.target.id]);
    }
  };

  return (
    <>
      {weeks.map((week, id) => (
        <tr key={id}>
          {week.map((date, id) => (
            <td
              key={id}
              className={`p-2 border-solid border-gray-200 border-2
                ${
                  (date.isDisabled && "bg-gray-100") ||
                  (id === 0 && "bg-red-200") ||
                  (id === 6 && "bg-blue-200")
                }`}
            >
              <div className="h-24">
                <div
                  className={`mb-1 ${
                    date.isToday &&
                    "bg-gray-600 rounded-full w-6 h-6 text-center justify-center items-center"
                  }`}
                >
                  <span className={date.isToday ? "font-bold text-white" : ""}>
                    {date.date}
                  </span>
                </div>
                {!date.isDisabled && (
                  <>
                    {checkedTimes[0] && (
                      <DateCheckBox
                        className="morning"
                        id={`${year}${month}${date.date
                          .toString()
                          .padStart(2, 0)}morning`}
                        time="朝"
                        onChange={handleChange}
                        checked={
                          checkedItems.includes(
                            `${year}${month}${date.date
                              .toString()
                              .padStart(2, 0)}morning`
                          )
                            ? "checked"
                            : ""
                        }
                      />
                    )}
                    {checkedTimes[1] && (
                      <DateCheckBox
                        className="day"
                        id={`${year}${month}${date.date
                          .toString()
                          .padStart(2, 0)}day`}
                        time="昼"
                        onChange={handleChange}
                        checked={
                          checkedItems.includes(
                            `${year}${month}${date.date
                              .toString()
                              .padStart(2, 0)}day`
                          )
                            ? "checked"
                            : ""
                        }
                      />
                    )}
                    {checkedTimes[2] && (
                      <DateCheckBox
                        className="night"
                        id={`${year}${month}${date.date
                          .toString()
                          .padStart(2, 0)}night`}
                        time="夜"
                        onChange={handleChange}
                        checked={
                          checkedItems.includes(
                            `${year}${month}${date.date
                              .toString()
                              .padStart(2, 0)}night`
                          )
                            ? "checked"
                            : ""
                        }
                      />
                    )}
                  </>
                )}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default CalendarBody;
