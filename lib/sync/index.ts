import type { NextApiRequest, NextApiResponse } from "next";
import { getoOffsetAndLimitFromReq } from "controllers/products";
import { airtableBase } from "../airtable";
import { productIndex } from "../algolia";



export default function (req: NextApiRequest, res: NextApiResponse) {
  const { offset, limit } = getoOffsetAndLimitFromReq(req, 100, 10000);
  airtableBase("Furniture")
    .select({
      pageSize: 10,
    })
    .eachPage(
      async function (records, fetchNextPage) {
       const objects = records.map(r=>{
        return {
            objectID : r.id,
            ...r.fields
        }
       })
       await productIndex.saveObjects(objects)
       console.log("siguiente pagina");
       
        fetchNextPage()
    },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("termino");
        res.send("twemino")
      }
    );
    
}
