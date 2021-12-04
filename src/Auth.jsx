import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, provider } from "./components/api/firebase";
import DynamicBg from "./components/common/DynamicBg";
import Layout from "./components/common/Layout";
import { MailIcon } from "@heroicons/react/outline";
import GoogleButton from "react-google-button";
import { IconButton, makeStyles, Modal, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import styles from "./Auth.module.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRaduis: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

export default function Auth(props) {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // パスワードリセットモーダルの送信ボタンの関数
  const sendResetEmail = async (e) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  let navigate = useNavigate();
  useEffect(() => {
    const unSub = auth.onAuthStateChanged(
      (user) => {
        user && navigate("/calendar");
      },
      [navigate]
    );
    return () => unSub();
  });

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Layout>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              おくすりカレンダーを利用する
            </h2>
          </div>
          <form
            onSubmit={
              isLogin
                ? async (e) => {
                    e.preventDefault();
                    try {
                      await auth.signInWithEmailAndPassword(email, password);
                      navigate("/calendar");
                    } catch (error) {
                      alert("メールアドレスかパスワードが間違っています");
                    }
                  }
                : async (e) => {
                    e.preventDefault();
                    try {
                      await auth.createUserWithEmailAndPassword(
                        email,
                        password
                      );
                      navigate("/calendar");
                    } catch (error) {
                      alert(error.message);
                    }
                  }
            }
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                <MailIcon className="h-5 w-5 mr-1" />
                {isLogin ? "ログイン" : "登録"}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#forgotten"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpenModal(true)}
                >
                  パスワードを忘れた
                </a>
              </div>

              <div className="cursor-pointer text-indigo-600 hover:text-indigo-500">
                <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "登録画面へ" : "ログイン画面へ"}
                </span>
              </div>
            </div>
            <div>
              <GoogleButton className="mx-auto" onClick={signInGoogle} />
            </div>
          </form>
          {/* <div className="text-center">
            <Link to="/calendar">
              <u>登録せずに使う</u>
            </Link>
          </div> */}
        </div>
      </div>
      <DynamicBg />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={getModalStyle()} className={classes.modal}>
          <div className={styles.login_modal}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              type="email"
              name="email"
              label="Reset E-mail"
              value={resetEmail}
              onChange={(evt) => {
                setResetEmail(evt.target.value);
              }}
            />
            <IconButton onClick={sendResetEmail}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
