CREATE TABLE `demo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`gender` tinyint DEFAULT 0,
	`createTime` timestamp,
	CONSTRAINT `demo_id` PRIMARY KEY(`id`)
);
