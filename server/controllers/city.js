import { db } from "../connect.js"

export const getCities = (req, res) => {
  const q = `
  SELECT *
  FROM cities
  `  
  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err)
    
    return res.status(200).json(data)
  })
}

export const getCitiesByCountry = (req, res) => {
  const q = `
  SELECT *
  FROM cities
  WHERE country_id = ?
  `  
  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).json(err)
    
    return res.status(200).json(data)
  })
}