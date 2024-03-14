import { db } from "../connect.js"

/* Get Peaks list */

export const getLocations = (req, res) => {
  const q = `
  SELECT p.*
          ,i.path AS peak_img
          ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS peak_img
  FROM peaks AS p
  LEFT JOIN images AS i
    ON p.image_id = i.image_id
  `  
  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err)
    
    return res.status(200).json(data)
  })
}