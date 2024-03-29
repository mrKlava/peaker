import { db } from "../connect.js"
import moment from "moment"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


/* Get users for Users page */

export const getUsers = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT *
    FROM vw_filtered_users
    ` 

    db.query(q, [], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(data)
    })
  })
}


/* Get users for Users page with filters applied */

export const getFilterUsers = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    // dynamic controller for filtering functionality
    const arr = []
    const params = []

    for (const [key, value] of Object.entries(req.query)) {
      if (value) {
        if (key === 'search') {               // search params
          arr.push(`search_column LIKE ?`)
          
          params.push(`%${value.split(" ").join("%")}%`)
        } else {                              // other filters
          if (key === 'country_id') {
            arr.push('country_id = ?')
            params.push(parseInt(value))
          } else if (key === 'city_id') {
            arr.push('city_id = ?')
            params.push(parseInt(value))
          // } else if (key === 'followers') {
          //   arr.push('')
          // } else if (key === 'following') {

          } else if (key === 'page') {
            params.push(parseInt(value) * 10)
          }
        }
      }
    }

    // create query with filtering or with out and pagination
    const q = `
    SELECT *
    FROM vw_filtered_users
    ` 
    let clause = "WHERE "
    const page = ` LIMIT ?, 10`

    const finalQ = (arr.length ? q + clause + arr.join(' AND ') : q) + page

    db.query(finalQ, params, (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data.length) return res.status(200).json('')

      // create resp with ids to next and previous page
      return res.status(200).json(
        {
          data, 
          nextId: parseInt(req.query.page) + 1,
          previousId: parseInt(req.query.page) - 1
        }
      )
    })
  })
}


/* Get user by user_id */

export const getUser = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  const userID = req.params.userID

  const q = `
  SELECT *
  FROM vw_users
  WHERE user_id = ?
  `

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err)
    if (!data[0]) return res.status(200).json('') 

    const {...user} = data[0]

    return res.status(200).json({...user, birthday: moment(user.birthday).format("YYYY-MM-DD")})
  })
}


/* Update user */

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  // check if token is valid
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    // validate params
    const capitalize = (str) => {
      if (!str || typeof(str) !== "string") return null

      let newStr = str.toLowerCase()

      return newStr.toLowerCase().charAt(0).toUpperCase() + newStr.slice(1)
    }

    const nameRegex = /[a-z]/gi
    const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
    const usernameRegex = /\w/gi
    const genders = ["Male", "Female"]


    let user_img        = req.body.user_img !== 'no-img.png' ? req.body.user_img : null
    let image_id        = null

    let firstname       = nameRegex.test(req.body.firstname) ? capitalize(req.body.firstname): null
    let middlename      = nameRegex.test(req.body.middlename) ? capitalize(req.body.middlename) : null
    let lastname        = nameRegex.test(req.body.lastname) ? capitalize(req.body.lastname) : null
    
    let gender          = nameRegex.test(req.body.gender) && genders.includes(capitalize(req.body.gender)) ? capitalize(req.body.gender) : null
    let birthday        = dateRegex.test(req.body.birthday) ? req.body.birthday : null
    let city_id         = typeof(parseInt(req.body.city_id)) === 'number' ? parseInt(req.body.city_id) : null

    let email           = emailRegex.test(req.body.email) ? req.body.email : null
    let username        = usernameRegex.test(req.body.username) ? req.body.username : null
    // let username        = req.body.username

    let password        = req.body.password ? req.body.password : null
    let rePassword      = req.body.rePassword ? req.body.rePassword : null

    // handle images 

    // if (user_img) {
    //   const qImageId = `
    //   SELECT image_id
    //   FROM images
    //   WHERE path = ?
    //     AND user_id = ?
    //   `
    //   db.query(qImageId, [user_img, user.id], async (err, data) => {
    //     if (err) return res.status(500).json(err)
  
    //     image_id = await parseInt(data.image_id)

    //     console.log(`image found: ${data[0].image_id}`)
    //   })
    // }


    // handle password
    if ( password && password.length && password === rePassword) {
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
      firstname = ?
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
      // image_id
      firstname
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

    db.query(q, params, (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0) return res.status(200).json("User updated")

      return res.status(403).json("You can update only your account")
    })
  })
}