CREATE TABLE IF NOT EXISTS `listings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `price` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `listings` (`name`,`price`) VALUES ('Iphone 8','400e');
INSERT INTO `listings` (`name`,`price`) VALUES ('Shirt','5e');
INSERT INTO `listings` (`name`,`price`) VALUES ('Speakers','40e');