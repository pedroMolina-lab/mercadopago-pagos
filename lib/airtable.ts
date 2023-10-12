import Airtable from "airtable";

export const airtableBase = new Airtable({
  apiKey:process.env.KEY_AIRTABLE,
}).base("apph19Iffu0K4Kh5z");
