ALTER VIEW vw_comments
AS 
SELECT c.*
      ,pc.post_id
      ,u.firstname
      ,u.lastname
      ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
  FROM comments AS c
  JOIN users AS u
    ON c.user_id = u.user_id
  LEFT JOIN images as i
  on u.image_id = i.image_id
  LEFT JOIN post_comments AS pc
    ON c.comment_id = pc.comment_id
  ORDER BY c.created DESC