CREATE VIEW vw_users
AS 
SELECT u.user_id
    ,u.firstname
      ,u.middlename
      ,u.lastname
      ,u.gender
      ,u.birthday
      ,u.image_id
      ,u.email
      ,u.username
      ,u.bio
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