import { useContext, useEffect, useState } from "react";
import PrimaryButton from "./components/common/PrimaryButton";
import CalendarBody from "./components/calendar/CalendarBody";
import SelectTime from "./components/calendar/SelectTime";
import Layout from "./components/common/Layout";
import { app, auth } from "./components/api/firebase";
import { useNavigate } from "react-router";
import SecondaryButton from "./components/common/SecondaryButton";
import { UserDataContext } from "./provider/UserDataProvider";

export default function Calendar() {
  let navigate = useNavigate();
  const db = app.firestore();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [email, setEmail] = useState("");
  const { uid, setUid, checkedTimes, setCheckedTimes } =
    useContext(UserDataContext);

  // ユーザー情報読み込み
  // 存在しなかったらログイン画面へ
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && setUid(user.uid);
      user && setEmail(user.email);
      !user && navigate("/");
      console.log("Fetch uid");
    });
    return () => unSub();
  }, [navigate, setUid]);

  // 初期読み込み時、firestoreからデータを読み込んでsetCheckedTimesを実行
  useEffect(() => {
    const timer = setTimeout(() => {
      let docRef = db.collection("checkedDateTimeList").doc(uid);
      docRef.get().then((doc) => {
        if (doc.data().checkedTimes) {
          setCheckedTimes(doc.data().checkedTimes);
          console.log("Fetch Firestore's Times.");
        }
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [db, uid, setCheckedTimes]);

  // 次の月ボタンの処理
  const prevHandler = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  // 前の月ボタンの処理
  const nextHandler = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const todayHandler = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  return (
    <Layout title="カレンダー">
      <div className="relative">
        <h1 className="font-bold text-2xl md:text-4xl pt-14 md:pt-0 mb-3 text-center">
          おくすりカレンダー
        </h1>
        <div className="flex justify-between">
          <div>
            <SelectTime />
          </div>
          <div className="mr-4">
            <SecondaryButton
              className="text-right"
              onClick={async () => {
                try {
                  await auth.signOut();
                  navigate("/");
                } catch (error) {
                  alert(error.message);
                }
              }}
              text="ログアウト"
            ></SecondaryButton>
            <small>ログインユーザー:{email}</small>
          </div>
        </div>
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th id="title" colSpan="4">
                {`${year}/${String(month + 1).padStart(2, "0")}`}
              </th>
              <th
                id="prev"
                onClick={prevHandler}
                className="cursor-pointer w-14 md:w-32"
              >
                &laquo;
              </th>
              <th>
                <PrimaryButton onClick={todayHandler} text="今日" id="today" />
              </th>
              <th
                id="next"
                onClick={nextHandler}
                className="cursor-pointer w-14 md:w-32"
              >
                &raquo;
              </th>
            </tr>
            <tr className="text-xl">
              <th className="w-14 md:w-32 text-red-600">日</th>
              <th className="w-14 md:w-32">月</th>
              <th className="w-14 md:w-32">火</th>
              <th className="w-14 md:w-32">水</th>
              <th className="w-14 md:w-32">木</th>
              <th className="w-14 md:w-32">金</th>
              <th className="w-14 md:w-32 text-blue-700">土</th>
            </tr>
          </thead>
          <tbody className="text-base">
            <CalendarBody
              checkedTimes={checkedTimes}
              uid={uid}
              year={year}
              month={month}
            />
          </tbody>
        </table>
        <style jsx="true">{`
          th {
            height: 58px;
            border: 2px solid rgba(229, 231, 235, var(--tw-border-opacity));
          }
        `}</style>
      </div>
    </Layout>
  );
}
