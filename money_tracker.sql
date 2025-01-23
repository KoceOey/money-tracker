-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220902.0b5d7b67cf
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2025 at 08:53 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `money_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `balance` decimal(15,2) DEFAULT 0.00,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `account_name`, `balance`, `description`) VALUES
(0, 'None', '0.00', ''),
(1, 'Savings Account', '28000000.00', 'Main savings account'),
(2, 'Checking Account', '11000000.00', 'Daily expenses account'),
(3, 'Business Account', '1000000.00', 'For business transactions'),
(4, 'Emergency Fund', '15000000.00', 'For emergencies');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `trtype_id` int(11) NOT NULL,
  `from_account_id` int(11) NOT NULL,
  `to_account_id` int(11) NOT NULL,
  `trcategory_id` int(11) NOT NULL,
  `tr_date` datetime NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `trtype_id`, `from_account_id`, `to_account_id`, `trcategory_id`, `tr_date`, `amount`, `description`) VALUES
(1, 1, 0, 2, 2, '2025-01-22 00:00:00', '1500000.00', 'dapet duit yipee'),
(2, 2, 2, 0, 5, '2025-01-22 00:00:00', '500000.00', 'all you can eat'),
(3, 3, 2, 1, 9, '2025-01-22 00:00:00', '500000.00', 'nabung'),
(4, 3, 2, 1, 9, '2025-01-23 00:00:00', '500000.00', 'nabung'),
(6, 3, 1, 2, 9, '2025-01-24 00:00:00', '2500000.00', 'pindahin duit ya');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_category`
--

CREATE TABLE `transaction_category` (
  `trcategory_id` int(11) NOT NULL,
  `trtype_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_category`
--

INSERT INTO `transaction_category` (`trcategory_id`, `trtype_id`, `category`) VALUES
(1, 1, 'Salary'),
(2, 1, 'Allowance'),
(3, 1, 'Investment'),
(4, 1, 'Others'),
(5, 2, 'Foods'),
(6, 2, 'Groceries'),
(7, 2, 'Utilities'),
(8, 2, 'Entertainment'),
(9, 3, 'Account Transfer');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_type`
--

CREATE TABLE `transaction_type` (
  `trtype_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_type`
--

INSERT INTO `transaction_type` (`trtype_id`, `type`) VALUES
(1, 'Income'),
(2, 'Expenses'),
(3, 'Transfer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `trtype_id` (`trtype_id`),
  ADD KEY `from_account_id` (`from_account_id`),
  ADD KEY `to_account_id` (`to_account_id`),
  ADD KEY `trcategory_id` (`trcategory_id`);

--
-- Indexes for table `transaction_category`
--
ALTER TABLE `transaction_category`
  ADD PRIMARY KEY (`trcategory_id`),
  ADD KEY `trtype_id` (`trtype_id`);

--
-- Indexes for table `transaction_type`
--
ALTER TABLE `transaction_type`
  ADD PRIMARY KEY (`trtype_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transaction_category`
--
ALTER TABLE `transaction_category`
  MODIFY `trcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transaction_type`
--
ALTER TABLE `transaction_type`
  MODIFY `trtype_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`trtype_id`) REFERENCES `transaction_type` (`trtype_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`from_account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`to_account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_4` FOREIGN KEY (`trcategory_id`) REFERENCES `transaction_category` (`trcategory_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction_category`
--
ALTER TABLE `transaction_category`
  ADD CONSTRAINT `transaction_category_ibfk_1` FOREIGN KEY (`trtype_id`) REFERENCES `transaction_type` (`trtype_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
