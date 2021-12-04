import { Helmet } from "react-helmet";

export default function Layout({ children, title = "" }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      <Helmet>
        <title>{title && `${title} - `}おくすりカレンダー</title>
      </Helmet>
      <main className="my-3 flex flex-1 justify-center items-center flex-col">
        {children}
      </main>
      <footer className="w-full h-6 flex justify-center items-center text-sm">
        @waterleaper 2021
      </footer>
    </div>
  );
}
