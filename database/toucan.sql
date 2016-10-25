-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 25, 2016 at 05:29 PM
-- Server version: 5.7.15-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toucan`
--

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(10) NOT NULL,
  `name` varchar(50) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `email` varchar(50) CHARACTER SET ascii COLLATE ascii_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `email`) VALUES
(1, 'Adam', 'adam@gmail.com'),
(2, 'Mark', 'mark@gmail.com'),
(3, 'Daniel', 'daniel@gmail.com'),
(4, 'Andrea', 'andrea@gmail.com'),
(5, 'Chelsea', 'chelsea@gmail.com'),
(6, 'Pawel Buderaski', 'pbuderaski@gmail.com'),
(7, 'Jacek Smetek', 'smetek@gmail.com'),
(8, 'John Conor', 'conor@gmail.com'),
(9, 'Travis Pastrana', 'travis@gmail.com'),
(10, 'Brad Pitt', 'bpitstop@gmail.com'),
(11, 'Stanley Kubrick', 'skbrick@gmail.com.pl.pl'),
(12, 'Ingmar Bergman', 'igmari@wp.pl'),
(13, 'Hall AI', 'halloai@wp.pl'),
(14, 'Bill Hicks', 'nehickups@wp.pl'),
(15, 'Don Corleone', 'gm@mafia.it'),
(16, 'Alan Touring', 'atourdebin@gmail.com'),
(17, 'Alexis', 'echo@gmail.com'),
(18, 'Mr Muscle', 'mm@wp.pl'),
(19, 'Cambridge Student', 'cs@yahoo.com');

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `id` int(10) NOT NULL,
  `name` varchar(100) CHARACTER SET ascii COLLATE ascii_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`id`, `name`) VALUES
(1, 'Oxford'),
(2, 'Cambridge');

-- --------------------------------------------------------

--
-- Table structure for table `school_member`
--

CREATE TABLE `school_member` (
  `school_id` int(10) NOT NULL,
  `member_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_member`
--

INSERT INTO `school_member` (`school_id`, `member_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 5),
(1, 10),
(1, 11),
(1, 17),
(1, 18),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 19);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_member`
--
ALTER TABLE `school_member`
  ADD PRIMARY KEY (`member_id`,`school_id`),
  ADD KEY `school_id` (`school_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `school_member`
--
ALTER TABLE `school_member`
  ADD CONSTRAINT `school_member_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `school_member_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
