import { FC } from "react";

interface EmailsProps {
  emails: string[];
}

const Emails: FC<EmailsProps> = ({ emails }) => {
  return (
    <div className="">
      <ul className="flex flex-col items-center w-min mx-auto text-center">
        {emails.map((email) => (
          <li
            className="bg-primary text-secondary my-2 w-max font-semibold text-xl px-4 py-1 rounded-md"
            key={email}
          >
            {email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Emails;
