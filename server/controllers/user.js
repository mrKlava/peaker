import { db } from "../connect.js"
import moment from "moment"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const getUsers = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT u.user_id
          ,u.firstname
          ,u.lastname
          ,ci.city_id
          ,ci.country_id
          ,IF (u.city_id IS NULL, NULL, CONCAT(ci.name, ', ', co.name)) as location
          ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
          ,CONCAT(u.firstname, ' ', u.lastname)
    FROM users AS u
    LEFT JOIN images AS i
      ON u.image_id = i.image_id
    LEFT JOIN cities AS ci
      ON u.city_id = ci.city_id
    LEFT JOIN countries AS co
      ON ci.country_id = co.country_id
    ` 

    db.query(q, [], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(data)
    })
  })
}

export const getFilterUsers = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    let clause = "WHERE "
    const arr = []
    const params = []

    for (const [key, value] of Object.entries(req.query)) {
      // const [entry[0]] = entry[1]
      if (value) {
        if (key === 'search') {
          arr.push(`search_column LIKE ?`)
          params.push(value)
        } else {
          if (key === 'country_id') {
            arr.push('ci.country_id = ?')
          } else if (key === 'city_id') {
            arr.push('ci.city_id = ?')
          } else if (key === 'followers') {

            arr.push('')
          } else if (key === 'following') {

          }

          params.push(parseInt(value))
        }

      }
    }

    const q = `
    SELECT u.user_id
          ,u.firstname
          ,u.lastname
          ,ci.city_id
          ,ci.country_id
          ,IF (u.city_id IS NULL, NULL, CONCAT(ci.name, ', ', co.name)) as location
          ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
          ,CONCAT(u.firstname, ' ', u.lastname) AS search_column
    FROM users AS u
    LEFT JOIN images AS i
      ON u.image_id = i.image_id
    LEFT JOIN cities AS ci
      ON u.city_id = ci.city_id
    LEFT JOIN countries AS co
      ON ci.country_id = co.country_id
    ` 

    const finalQ = arr.length ? q + clause + arr.join(' AND ') : q

    console.log(finalQ)
    console.log(params)

    db.query(finalQ, params, (err, data) => {
      if (err) return res.status(500).json(err)

      console.log(moment(new Date).format("HH:MM:ss"))
      console.log(data[0])
      console.log(data.length)

      return res.status(200).json(data)
    })
  })
}

export const getUser = (req, res) => {
  const userID = req.params.userID

  const q = `
  SELECT u.*
        ,ci.city_id
        ,ci.country_id
        ,IF (u.city_id IS NULL, NULL, CONCAT(ci.name, ', ', co.name)) as location
        ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
  FROM users AS u
  LEFT JOIN images AS i
    ON u.image_id = i.image_id
  LEFT JOIN cities AS ci
    ON u.city_id = ci.city_id
  LEFT JOIN countries AS co
    ON ci.country_id = co.country_id
  WHERE u.user_id = ?
  `

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err)

    const {hash, ...user} = data[0]

    return res.status(200).json({...user, birthday: moment(user.birthday).format("YYYY-MM-DD")})
  })
}


export const updateUser = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    // validate params
    const capitalize = (str) => {
      if (!str || typeof(str) !== 'string') return null

      let newStr = str.toLowerCase()

      return newStr.toLowerCase().charAt(0).toUpperCase() + newStr.slice(1)
    }

    const nameRegex = /[a-z]/gi
    const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
    const usernameRegex = /\w/gi
    const genders = ['Male', 'Female']


    let user_img        = req.body.user_img !== 'no-img.png' ? req.body.user_img : null

    let image_id = null

    let firstname       = nameRegex.test(req.body.firstname) ? capitalize(req.body.firstname): null
    let middlename      = nameRegex.test(req.body.middlename) ? capitalize(req.body.middlename) : null
    let lastname        = nameRegex.test(req.body.lastname) ? capitalize(req.body.lastname) : null
    
    let gender          = nameRegex.test(req.body.gender) ? capitalize(req.body.gender) : null
    let birthday        = dateRegex.test(req.body.birthday) ? req.body.birthday : null
    let city_id         = typeof(parseInt(req.body.city_id)) === 'number' ? parseInt(req.body.city_id) : null

    let email           = emailRegex.test(req.body.email) ? req.body.email : null
    let username        = usernameRegex.test(req.body.username) ? req.body.username : null
    // let username        = req.body.username

    let password        = req.body.password ? req.body.password : null
    let rePassword      = req.body.rePassword ? req.body.rePassword : null

    // handle images 

    if (user_img) {
      const qImageId = `
      SELECT image_id
      FROM images
      WHERE path = ?
        AND user_id = ?
      `
      db.query(qImageId, [user_img, user.id], async (err, data) => {
        if (err) return res.status(500).json(err)
  
        image_id = await parseInt(data.image_id)

        console.log(`image found: ${data[0].image_id}`)
      })
    }


    // handle password

    if ( password && password.length >= 8 && password === rePassword) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      const qPassword = `
      UPDATE users 
      SET hash = ?
      WHERE user_id = ?
      `
      db.query(qPassword, [hash, user.id], (err, data) => {
        if (err) return res.status(500).json(err)
      })
    }

    // handle update
    const q = `
    UPDATE users
    SET 
      image_id = ?

      ,firstname = ?
      ,middlename = ?
      ,lastname = ?

      ,bio = ?

      ,gender = ?
      ,birthday = ?
      ,city_id = ?

      ,email = ?
      ,username = ?

    WHERE user_id = ?
    `
    
    // const prepare params
    const params =  [ 
      image_id
      
      ,firstname
      ,middlename
      ,lastname

      ,req.body.bio

      ,gender
      ,birthday
      ,city_id

      ,email
      ,username

      ,user.id
    ]


    // console.log(`params: image_id: ${user_img}`)
    console.log(params)

    db.query(q, params, (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0) return res.status(200).json('User updated')

      console.log(data)

      return res.status(403).json('You can update only your account')
    })
  })
}