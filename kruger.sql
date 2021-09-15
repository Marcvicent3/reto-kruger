-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-09-2021 a las 01:56:51
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kruger`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id_Usuario` int(11) NOT NULL,
  `Identificador` varchar(5) NOT NULL,
  `Nombres` varchar(30) NOT NULL,
  `Apellidos` varchar(30) NOT NULL,
  `Cedula` varchar(10) NOT NULL,
  `Correo_Electronico` varchar(50) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Domicilio` varchar(100) DEFAULT NULL,
  `Celular` varchar(10) DEFAULT NULL,
  `Estado_Vacunacion` tinyint(1) DEFAULT NULL,
  `Tipo_Vacuna` varchar(15) DEFAULT NULL,
  `Fecha_Vacunacion` date DEFAULT NULL,
  `Numero_Dosis` tinyint(4) DEFAULT NULL,
  `Usuario` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id_Usuario`, `Identificador`, `Nombres`, `Apellidos`, `Cedula`, `Correo_Electronico`, `Fecha_Nacimiento`, `Domicilio`, `Celular`, `Estado_Vacunacion`, `Tipo_Vacuna`, `Fecha_Vacunacion`, `Numero_Dosis`, `Usuario`, `Password`) VALUES
(1, 'ADMIN', 'Marcelo Vicente', 'Romero Astudillo', '0704691229', 'marcvicent3@hotmail.com', NULL, NULL, NULL, 0, NULL, NULL, NULL, 'ADMIN', 'QURNSU4='),
(2, 'USER', 'Danny Alexander', 'Usca Farinango', '1719181941', 'danny@gmail.com', '2021-09-18', 'Norte de Riobamba', '0123456789', 0, NULL, NULL, NULL, 'DAUF', 'MTcxOTE4MTk0MQ=='),
(4, 'USER', 'Pedro Mauricio', 'Fernandez Herrera', '0604896233', 'pedro@gmail.com', NULL, NULL, NULL, 0, NULL, NULL, NULL, 'PMFH', 'MDYwNDg5NjIzMw=='),
(5, 'USER', 'Marco Vinicio', 'Ramirez Ortega', '0605266600', 'marco@gmail.com', NULL, NULL, NULL, 1, 'Pfizer', NULL, NULL, 'MVRO', 'MDYwNTI2NjYwMA=='),
(6, 'USER', 'Nycole Britanny', 'Amancha Varga', '0604209452', 'nicol@gmail.com', NULL, NULL, NULL, 1, 'Pfizer', NULL, NULL, 'NBAV', 'MDYwNDIwOTQ1Mg=='),
(7, 'USER', 'Katerine Maria', 'Amaguaña Ortiz', '0605471879', 'katy@gmail.com', NULL, NULL, NULL, 1, NULL, NULL, NULL, 'KMAO', 'MDYwNTQ3MTg3OQ==');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
