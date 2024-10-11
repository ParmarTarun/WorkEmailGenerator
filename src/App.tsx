import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Emails from "./components/Emails";

function App() {
  const [emails, setEmails] = useState<string[]>([]);
  const copyAllEmails = () => {
    navigator.clipboard.writeText(
      emails.reduce((a, c) => a + ",\n" + c, "").slice(1)
    );
  };
  return (
    <>
      <div className="min-h-[30vh] flex flex-col justify-center">
        <h1 className="text-6xl font-bold ">Work Mail Generator</h1>
      </div>
      <div className="min-h-[70vh]">
        <Form setEmails={setEmails} />
        {emails.length > 0 && (
          <>
            <Emails emails={emails} />
            <button
              className="border text-primary font-semibold border-primary text-xl px-4 py-2 rounded-md mt-2 hover:bg-primary hover:text-secondary"
              onClick={copyAllEmails}
            >
              Copy ALL
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
