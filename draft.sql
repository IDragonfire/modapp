DROP TABLE `lobby_ban`;

CREATE TABLE `ban` (
  `id` MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `reason` VARCHAR(255) NOT NULL,
  `expire_at` TIMESTAP COMMENT 'can be null if permanent ban',
  `type` ENUM('chat', 'game', 'global') NOT NULL,
  `duration` ENUM('permanent', 'expire') NOT NULL,
  `status` ENUM('disabled', 'default') NOT NULL COMMENT 'mod can disable the ban',
  `disabled_reason` VARCHAR(255),
  `disabled_by` MEDIUMINT(8) UNSIGNED,
  `disabled_at` TIMESTAMP;
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`disabled_by`) REFERENCES `login`(`id`)
);
