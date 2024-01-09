import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import moment from "moment"


/* Login */

export const login = (req, res) => {
  // check if user exists by email
  const q = `
  SELECT *
  FROM vw_user
  WHERE email = ?
  `

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err)
    if (!data.length) return res.status(404).json("User does not exist")

    // check password match
    const checkPassword = bcrypt.compareSync(req.body.password, data[0].hash) // index 0 - array of users should have only one item

    if (!checkPassword) return res.status(400).json("Wrong password or username")

    const { hash, ...user } = data[0] // extract user object without hashed password
    const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY) // create token using user id 

    res.cookie("accessToken", token, {
      httpOnly: true,

    }).status(200).json({...user, birthday: moment(user.birthday).format("YYYY-MM-DD")}) // return user object
  })
}


/* Register */

export const register = (req, res) => {
  // check if user exists by email
  const q = `
    SELECT * 
    FROM users
    WHERE email = ?
  `

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length) return res.status(409).json("User already exists") // 409 trying create or update data already exists

    // create hashed password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    
    // create new user
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
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    ]

    db.query(q, [params], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json("User has been created")
    })
  })
}


/* Logout */

export const logout = (req, res) => {
  res.clearCookie("accessToken", { //remove token
    secure: true,
    sameSite: "none" // to be able to use different ports
  }).status(200).json("Successfully logout")
}