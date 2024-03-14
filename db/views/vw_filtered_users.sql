CREATE VIEW vw_filtered_users
AS
SELECT u.user_id
      ,u.firstname
      ,u.lastname
      ,ci.city_id
      ,ci.country_id
      ,IF (u.city_id IS NULL, NULL, CONCAT(ci.name, ', ', co.name)) AS location
      ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
      -- ,CONCAT(u.firstname, ' ', u.lastname) AS search_column
      ,CONCAT_WS(' ', u.firstname, u.lastname, u.email, u.username) AS search_column
FROM users AS u
LEFT JOIN images AS i
  ON u.image_id = i.image_id
LEFT JOIN cities AS ci
  ON u.city_id = ci.city_id
LEFT JOIN countries AS co
  ON ci.country_id = co.country_id