import { personDetailType } from "../types";

export const generateMails = async (
  domain: string,
  namesList: personDetailType[]
): Promise<string[]> => {
  const api_key = import.meta.env.VITE_API_KEY;
  if (!api_key) throw new Error("Failed to load API KEY");

  const promises: Promise<any>[] = [];

  namesList.forEach((n) => {
    const { firstName, lastName } = n;
    promises.push(
      fetch(
        `https://api.hunter.io/v2/email-finder?domain=${domain}&first_name=${firstName}&last_name=${lastName}&api_key=${api_key}`
      ).then((response) => response.json())
    );
  });

  const responses = await Promise.all(promises);
  console.log("Responses:", responses);
  const emails: string[] = [];
  responses.forEach((resp) => {
    emails.push(resp.data.email || "Not Found!");
  });
  return emails;
};
