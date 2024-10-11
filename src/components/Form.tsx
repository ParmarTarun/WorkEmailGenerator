import React, { Dispatch, SetStateAction, useState } from "react";
import { generateMails } from "../api/mail";
import { personDetailType } from "../types";

const dummyData = {
  domain: "broadridge.com",
  names: {
    "0": { id: "0", firstName: "Sydney", lastName: "Province" },
  },
};

interface FormProps {
  setEmails: Dispatch<SetStateAction<string[]>>;
}

const Form: React.FC<FormProps> = ({ setEmails }) => {
  const [namesMap, setNamesMap] = useState<{
    [key: string]: personDetailType;
  }>(dummyData.names);
  const [domain, setDomain] = useState<string>(dummyData.domain);
  const [loading, setLoading] = useState(false);

  const addName = () => {
    const newId = "" + Object.values(namesMap).length;
    setNamesMap({
      ...namesMap,
      [newId]: { id: newId, firstName: "", lastName: "" },
    });
  };

  const removeName = (id: string) => {
    const curr = { ...namesMap };
    delete curr[id];
    setNamesMap({ ...curr });
  };

  const handleNameChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNamesMap({
      ...namesMap,
      [id]: { ...namesMap[id], [e.target.name]: e.target.value.trim() },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const emails = await generateMails(domain, Object.values(namesMap));
      setEmails(emails);
    } catch (error) {
      alert("Failed to generate!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col m-auto text-left text-2xl">
      <div className="form-control domain py-4 text-3xl mb-8">
        <label htmlFor="domain">Domain:</label>
        <input
          type="text"
          placeholder="domain.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>
      {Object.values(namesMap).map((el) => {
        const { firstName, lastName } = el;
        return (
          <div className="flex gap-8 px-4" key={el.id}>
            <div className="form-control">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                placeholder="John"
                name="firstName"
                value={firstName}
                onChange={(e) => handleNameChange(el.id, e)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                placeholder="Doe"
                name="lastName"
                value={lastName}
                onChange={(e) => handleNameChange(el.id, e)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <button
                className="text-negative font-bold text-2xl"
                onClick={() => removeName(el.id)}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
      <div className="mt-8">
        <button
          type="button"
          className="bg-primary w-[40px] h-[40px] rounded-full text-secondary flex place-content-center font-bold text-2xl mx-auto"
          onClick={addName}
        >
          +
        </button>
      </div>
      {Object.values(namesMap).length > 0 && (
        <div className="flex justify-center my-12">
          {!loading ? (
            <button
              type="submit"
              className="bg-primary text-secondary font-bold px-4 py-2 rounded-md text-2xl hover:text-primary hover:bg-secondary border border-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <p className="font-italic">Generating...</p>
          )}
        </div>
      )}
    </form>
  );
};

export default Form;
