import { db } from "../connect.js"


/* Get Country list */

export const getCountries = (req, res) => {
  const q = `
  SELECT *
  FROM countries
  ORDER BY name ASC
  `  
  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err)
    
    return res.status(200).json(data)
  })
}