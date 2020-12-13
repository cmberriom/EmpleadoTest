-- Script Date: 13/12/2020 5:59 p. m.  - ErikEJ.SqlCeScripting version 3.5.2.86
-- Database information:
-- Database: C:\Proyectos\SQLite\BD\test.bd
-- ServerVersion: 3.30.1
-- DatabaseSize: 12 KB
-- Created: 12/12/2020 6:16 p. m.

-- User Table information:
-- Number of tables: 1
-- Empleado: -1 row(s)

SELECT 1;
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE [Empleado] (
  [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
, [Nombre] text NULL
, [Cargo] text NULL
, [Telefono] text NULL
, [Contrato] text NULL
);
INSERT INTO [Empleado] ([Id],[Nombre],[Cargo],[Telefono],[Contrato]) VALUES (
1,'Armando Arias','Administrador','111111','Fijo');
INSERT INTO [Empleado] ([Id],[Nombre],[Cargo],[Telefono],[Contrato]) VALUES (
2,'Bernardo Baez','Bartender','222222','Indefinido');
INSERT INTO [Empleado] ([Id],[Nombre],[Cargo],[Telefono],[Contrato]) VALUES (
3,'Cristian Castro','Consultor','333333','Servicios');
COMMIT;

