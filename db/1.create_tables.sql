CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(128) NOT NULL,
  `middlename` varchar(128),
  `lastname` varchar(128) NOT NULL,
  `gender` varchar(12),
  `birthday` date NOT NULL,
  `image_id` int,
  `city_id` int,
  `email` varchar(255) UNIQUE NOT NULL,
  `username` varchar(32) UNIQUE NOT NULL,
  `hash` varchar(255) NOT NULL,
  `registered` datetime NOT NULL
);

CREATE TABLE `images` (
  `image_id` int PRIMARY KEY AUTO_INCREMENT,
  `path` varchar(255),
  `user_id` int NOT NULL,
  `uploaded` datetime NOT NULL
);

CREATE TABLE `comments` (
  `comment_id` int PRIMARY KEY AUTO_INCREMENT,
  `text` varchar(500) NOT NULL,
  `valid` boolean NOT NULL,
  `user_id` int NOT NULL,
  `created` datetime NOT NULL
);

CREATE TABLE `posts` (
  `post_id` int PRIMARY KEY AUTO_INCREMENT,
  `text` text,
  `user_id` int NOT NULL,
  `created` datetime NOT NULL,
  `edited` datetime
);

CREATE TABLE `post_images` (
  `post_id` int,
  `image_id` int
);

CREATE TABLE `post_comment` (
  `post_id` int NOT NULL,
  `comment_id` int NOT NULL
);

CREATE TABLE `comment_comments` (
  `reply_comment_id` int NOT NULL,
  `comment_id` int NOT NULL
);

CREATE TABLE `post_likes` (
  `like_id` int PRIMARY KEY AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created` datetime NOT NULL
);

CREATE TABLE `comment_likes` (
  `like_id` int PRIMARY KEY AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created` datetime NOT NULL
);

CREATE TABLE `countries` (
  `country_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(128) UNIQUE NOT NULL
);

CREATE TABLE `cities` (
  `city_id` int PRIMARY KEY AUTO_INCREMENT,
  `country_id` int NOT NULL,
  `name` varchar(128) NOT NULL
);

CREATE TABLE `zone` (
  `zone_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(128) NOT NULL
);

CREATE TABLE `peaks` (
  `peak_id` int PRIMARY KEY AUTO_INCREMENT,
  `position` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `image_id` int,
  `description` text,
  `difficulty` int,
  `zone_id` int
);

CREATE TABLE `peak_countries` (
  `peak_id` int,
  `country_id` int
);

ALTER TABLE `post_images` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

ALTER TABLE `post_likes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

ALTER TABLE `post_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `post_images` ADD FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`);

ALTER TABLE `post_comment` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

ALTER TABLE `post_comment` ADD FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`);

ALTER TABLE `comment_likes` ADD FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`);

ALTER TABLE `comment_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `cities` ADD FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`);

ALTER TABLE `peak_countries` ADD FOREIGN KEY (`peak_id`) REFERENCES `peaks` (`peak_id`);

ALTER TABLE `peak_countries` ADD FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`);

ALTER TABLE `peaks` ADD FOREIGN KEY (`zone_id`) REFERENCES `zone` (`zone_id`);

ALTER TABLE `peaks` ADD FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`);

ALTER TABLE `comment_comments` ADD FOREIGN KEY (`reply_comment_id`) REFERENCES `comments` (`comment_id`);

ALTER TABLE `comment_comments` ADD FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`);
