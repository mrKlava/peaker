import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


/* LOGIN */

export const login = (req, res) => {
  // check if user exists by email

  console.log('api called')

  const q = `
  SELECT u.*
        ,IF (u.city_id IS NULL, NULL, CONCAT(ci.name, ',', co.name)) as location
        ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img 
  FROM users AS u
  LEFT JOIN images AS i
    ON u.image_id = i.image_id 
  LEFT JOIN cities AS ci
    ON u.city_id = ci.city_id
  LEFT JOIN countries AS co
    ON ci.country_id = co.country_id
  WHERE email = ?
  `

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err)
    if (!data.length) return res.status(404).json("User does not exist")

    console.log('query executed')


    // check password match
    const checkPassword = bcrypt.compareSync(req.body.password, data[0].hash) // index 0 - array of users should have only one item

    console.log('password compared')

    if (!checkPassword) return res.status(400).json("Wrong password or username")

    console.log('password correct')


    const { hash, ...user } = data[0] // extract user object without hashed password
    const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY) // create token using user id 

    res.cookie("accessToken", token, {
      httpOnly: true,

    }).status(200).json(user) // return user object

  })
}


/* REGISTER */

export const register = (req, res) => {
  // check if user exists by email
  const q = `
    SELECT * 
    FROM users
    WHERE email = ?
  `

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json({ "msg": "failed to check user" })
    if (data.length) return res.status(409).json("User already exists") // 409 trying create or update data already exists

    // create new user
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const q = `
      INSERT INTO users (firstname, lastname, email, username, hash, registered)
      VALUES (?)
    `
    const params = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.email,
      hash,
      new Date()

    ]

    db.query(q, [params], (err, data) => {
      if (err) return res.status(500).json({ "msg": "failed to create user" })

      return res.status(200).json("User has been created")
    })
  })
}


/* LOGOUT */

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none" // to be able to use different ports
  }).status(200).json("Successfully logout")
}