-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 09 nov. 2022 à 15:32
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id_account` int(255) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `role_id` int(64) NOT NULL,
  PRIMARY KEY (`id_account`),
  UNIQUE KEY `pseudo` (`pseudo`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `accounts`
--

INSERT INTO `accounts` (`id_account`, `pseudo`, `firstname`, `email`, `pwd`, `role_id`) VALUES
(28, 'Xav', 'Xavier', 'xavopeus@yahoo.fr', '$2y$10$M/6RBo7nCL487FB4wvyAzu2Rx8qR3s.3gMcJ4PqMtebu60a583fv.', 4),
(35, 'Renza', 'Remy', 'remy@gmail.com', '$2y$10$aEnyLqKTqvOVWrpEn0ueW.p36.yRahx9h/9l.qKRGcUMLSgqt5pay', 5),
(36, 'Juju', 'Julien', 'julien@yahoo.fr', '$2y$10$.HY8LR81f7VRFvkch2tLauXMMjEqsEYVp9V1lKiTiLYdOSvXdfB9K', 5),
(38, 'Mamy', 'MamylaPuce', 'mamylapuce.xav@gmail.com', '$2y$10$xmYsOTQ1UJt95YvH/YzZA.iJaBLt5tz.Rm0abczDTZrJCpOqo.0bi', 5);

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id_article` int(255) NOT NULL AUTO_INCREMENT,
  `account_id` int(255) NOT NULL,
  `title` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `moderated` tinyint(1) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id_article`),
  KEY `account_id` (`account_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id_article`, `account_id`, `title`, `created_at`, `moderated`, `content`) VALUES
(15, 28, 'The Truth is Somewhere', '2022-10-25 13:45:34', 0, 'I want to test this shit !! A very small amount of a drug used to test or benefit from its physiological action while minimizing undesirable side effects. The practice of taking a very small dose (= measured amount) of a psychedelic drug (= one that affects the mind) in order to become better at solving problems or at thinking of new ideas, or to treat medical problems such as anxiety, depression, or headaches:\r\nHow much of a risk is microdosing?\r\nPeople have experimented with psychedelic microdosing to treat ailments from anxiety to attention deficit hyperactivity disorder.\r\n'),
(21, 28, 'Review of deep learning', '2022-10-26 14:20:29', 0, 'In the last few years, the deep learning (DL) computing paradigm has been deemed the Gold Standard in the machine learning (ML) community.\nMoreover, it has gradually become the most widely used computational approach in the field of ML, thus achieving outstanding results on several complex cognitive tasks, \nmatching or even beating those provided by human performance. One of the benefits of DL is the ability to learn massive amounts of data. \nThe DL field has grown fast in the last few years and it has been extensively used to successfully address a wide range of traditional applications. More importantly, \nDL has outperformed well-known ML techniques in many domains, e.g., cybersecurity, natural language processing, bioinformatics, robotics and control, \nand medical information processing, among many others. Despite it has been contributed several works reviewing the State-of-the-Art on DL, \nall of them only tackled one aspect of the DL, which leads to an overall lack of knowledge about it. Therefore, in this contribution, we propose using \na more holistic approach in order to provide a more suitable starting point from which to develop a full understanding of DL. Deep !\n'),
(36, 36, 'How to Link CSS to HTML Files in Web Development', '2022-11-01 11:51:03', 0, 'HTML (HyperText Markup Language) and CSS (Cascading Style Sheet) are the fundamental web development languages. HTML defines a website’s content and structure, while CSS specifies the design and presentation. Together, both languages allow to create a website that is well-structured and functional.\n\nCSS defines style declarations and applies them to HTML documents. There are three different ways to link CSS to HTML based on three different types of CSS styles:\n\n    • Inline – uses the style attribute inside an HTML element\n    • Internal – written in the <head> section of an HTML file\n    • External – links an HTML document to an external CSS file\n\nThis article will focus on external CSS to an HTML file linking as it changes the appearance of your entire website with just one file. We’ll also include a more detailed explanation of CSS and its benefits.'),
(39, 35, 'How to start investing on the JSE', '2022-11-01 12:26:41', 0, 'Investing on the JSE\n\nStarting your investment journey does not have to be a daunting experience.  Here at the JSE we aim to provide you with the best information so that your investment decisions are made through well informed decisions. \n\nThe first step is to get an understanding of what the JSE is all about.\n\nWhen gold was discovered in South Africa in 1886, it quickly became apparent that a stock exchange was needed to raise money for the booming South African mining and financial industry.  Thus, in 1887 the Johannesburg Stock Exchange (JSE) was born.\n\nThe JSE has a history of over 130 years offering secure and efficient primary and secondary capital markets across a diverse range of securities. \n\nWe allow buyers and sellers to trade in five different markets:  Equities (Shares/Stocks), Equity Derivatives, Commodity Derivatives, Currency Derivatives and Interest Rate Products.\n\nThe JSE moved from the traditional ‘outcry’ floor-based trading to make way for a modern fully electronic trading, clearing and settlement system in June 1996.  With online trading access available to anyone or a stockbrokers only a phone call away, investing on the JSE is quicker, easier and more accessible than ever before. \n\nLet the JSE help you get connected to reach the full potential of your earnings and achieve your financial goals.'),
(41, 28, 'I want to believe', '2022-11-02 02:19:50', 0, 'At the start of their investigations, Mulder believes in the existence of aliens and the paranormal, while Scully, a medical doctor and a skeptic, is assigned to scientifically analyze Mulder\'s discoveries, offer alternate rational theories to his work, and thus return him to mainstream cases. Early in the series, both agents become pawns in a larger conflict and come to trust only each other and a few select people. The agents also discover an agenda of the government to keep secret the existence of extraterrestrial life. They develop a close relationship which begins as a platonic friendship but becomes a romance by the end of the series. In addition to the series-spanning story arc, \"monster of the week\" episodes form roughly two-thirds of all episodes.'),
(42, 35, 'What about the microdooose', '2022-11-02 02:20:22', 0, 'Microdosing, or micro-dosing, is a technique for studying the behaviour of drugs in humans through the administration of doses so low (\"sub-therapeutic\") they are unlikely to produce whole-body effects, but high enough to allow the cellular response to be studied. This is called a \"Phase 0 study\" and is usually conducted before clinical Phase I to predict whether a drug is viable for the next phase of testing. Human microdosing aims to reduce the resources spent on non-viable drugs and the amount of testing done on animals. '),
(43, 36, 'Bobby is Real', '2022-11-02 02:21:01', 0, 'The narration of Greyfriars Bobby is most unusual. The book is written from the point of view of the dog, which makes every-day events very strange. The main story of the book is directly adapted from the supposedly true Scottish story of Greyfriars Bobby. Bobby spends much time with his master and unofficial owner, \"Auld Jock\" (Scots for \"Old John\"), creating a very strong emotional connection. They have an intense connection and Jock cares for Bobby very well—though Jock never bought Bobby. This creates problems later, because of Jock\'s having, in the eyes of the law, \"stolen\" an unlicensed dog. Eventually, Auld Jock dies. Bobby is in great distress; but a loyal dog will never leave its owner\'s side, even after death. After his owner dies, Bobby is lost; he can barely function without his companion. Though his owner\'s body was identified by the man\'s given name, John Gray, and not as \"Auld Jock\", his nickname, people still tell Bobby to look for \"Jock\", which just worsens Bobby\'s pain. He is lost for a while, and a large reward is offered for his return. Eventually, Bobby finds Auld Jock\'s grave and guards it day and night. The pair are inseparable.');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id_comment` int(255) NOT NULL AUTO_INCREMENT,
  `account_id` int(255) NOT NULL,
  `article_id` int(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `moderated` tinyint(1) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `article_id` (`article_id`),
  KEY `account_id` (`account_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id_comment`, `account_id`, `article_id`, `created_at`, `moderated`, `content`) VALUES
(5, 36, 15, '2022-10-26 10:42:36', 0, 'Like Xav said on other Article : truth is outwhere, that\'s right and only one man kepp it...'),
(9, 28, 15, '2022-10-26 10:47:10', 0, 'I prefer to let you comment this...'),
(12, 35, 15, '2022-10-26 10:48:51', 0, 'What about your Mom ?'),
(16, 35, 21, '2022-10-26 16:21:50', 0, 'Would you like to know more ?? Buy the app bro !'),
(37, 35, 39, '2022-11-01 21:09:28', 0, 'The defer attribute is a boolean attribute. If the defer attribute is set, it specifies that the script is downloaded in parallel to parsing the page, and executed after the page has finished parsing.\nNote: The defer attribute is only for external scripts (should only be used if the src attribute is present).'),
(38, 36, 39, '2022-11-01 21:11:37', 0, '• If async is present: The script is downloaded in parallel to parsing the page, and executed as soon as it is available (before parsing completes)\n• If defer is present (and not async): The script is downloaded in parallel to parsing the page, and executed after the page has finished parsing\n• If neither async or defer is present: The script is downloaded and executed immediately, blocking parsing until the script is completed\n'),
(40, 38, 39, '2022-11-01 21:20:08', 0, 'There\'s some falafelles into the cloud, download it MAN!!');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role` int(255) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id_role`, `role`) VALUES
(1, 'Administrator'),
(4, 'Moderator'),
(5, 'Redactor');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id_role`);

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id_account`);

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comment_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_author` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id_account`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
