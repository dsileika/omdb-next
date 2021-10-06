// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  /*
  const dirRelativeToPublicFolder = "search_cache";
  let searchCache = await axios.get(
    `http://${req.headers.host}/${dirRelativeToPublicFolder}/the+walking+dead.json`,
  );
  return res.status(200).json(searchCache.data);
  */

  if (!req.query.s || !process.env.OMDB_API_KEY) {
    return res.status(404).json({});
  }

  let search = await axios.get(
    `http://www.omdbapi.com/?s=${req.query.s}&apikey=${process.env.OMDB_API_KEY}&page=${req.query.page}`,
  );
  return res.status(200).json(search.data);
}
