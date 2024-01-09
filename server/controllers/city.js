import { db } from "../connect.js"

/* Get City list */

export const getCities = (req, res) => {
  const q = `
  SELECT *
  FROM cities
  ORDER BY name ASC
  `  
  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err)
    
    return res.status(200).json(data)
  })
}

/* Get City list by country_id */

export const getCitiesByCountry = (req, res) => {
  const q = `
  SELECT *
  FROM cities
  WHERE country_id = ?
  ORDER BY name ASC
  `  
  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).json(err)
    
    return res.status(200).json(data)
  })
}