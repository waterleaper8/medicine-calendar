import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../../provider/UserDataProvider";
import { app } from "../api/firebase";

const SelectTime = (props) => {
  const db = app.firestore();
  const { uid, checkedTimes, setCheckedTimes } = useContext(UserDataContext);

  // 時間帯のチェックボックスをクリックしたときの処理
  const handlerCheckTime = (evt) => {
    const id = evt.target.id;
    let times = checkedTimes;
    switch (id) {
      case "morning":
        times[0] = !times[0];
        break;
      case "day":
        times[1] = !times[1];
        break;
      case "night":
        times[2] = !times[2];
        break;
      default:
        return;
    }
    console.log(times);
    setCheckedTimes([...times]);

    // checkedTimesに変更が発生したらfirestoreに書き込み;
    let docRef = db.collection("checkedDateTimeList").doc(uid);
    docRef.get().then((doc) => {
      if (doc.data().checkedTimes) {
        docRef.update({
          checkedTimes: checkedTimes,
        });
      } else {
        docRef.set({
          checkedTimes: checkedTimes,
        });
      }
    });
    console.log("Firestore checkedTimes update");
  };

  useEffect(() => {
    if (checkedTimes[0]) {
      document.getElementById("morning").setAttribute("checked", true);
    }
    if (checkedTimes[1]) {
      document.getElementById("day").setAttribute("checked", true);
    }
    if (checkedTimes[2]) {
      document.getElementById("night").setAttribute("checked", true);
    }
  }, [checkedTimes]);

  return (
    <div className="flex flex-col">
      <p className="mr-3">いつ服薬しますか？</p>
      <div className="flex">
        <div>
          <input
            type="checkbox"
            id="morning"
            className="mr-1 form-tick h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
            onClick={handlerCheckTime}
          />
          <label className="mr-1" htmlFor="morning">
            朝
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="day"
            className="mr-1 form-tick h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
            onClick={handlerCheckTime}
          />
          <label className="mr-1" htmlFor="day">
            昼
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="night"
            className="mr-1 form-tick h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
            onClick={handlerCheckTime}
          />
          <label className="mr-1" htmlFor="night">
            夜
          </label>
        </div>
      </div>
    </div>
  );
};

export default SelectTime;
