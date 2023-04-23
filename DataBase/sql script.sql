-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`evenement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`evenement` (
  `idevenement` INT NOT NULL AUTO_INCREMENT,
  `datum` DATE NOT NULL,
  `aanvangstijd` TIME NOT NULL,
  `entree_kosten` DECIMAL(15,2) NULL,
  PRIMARY KEY (`idevenement`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`omzet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`omzet` (
  `idomzet` INT NOT NULL AUTO_INCREMENT,
  `evenement_idevenement` INT NOT NULL,
  `drank_omzet` DECIMAL(15,2) NOT NULL,
  `entree_omzet` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`idomzet`),
  INDEX `fk_omzet_evenement_idx` (`evenement_idevenement` ASC),
  CONSTRAINT `fk_omzet_evenement`
    FOREIGN KEY (`evenement_idevenement`)
    REFERENCES `mydb`.`evenement` (`idevenement`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`gast`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`gast` (
  `idgast` INT NOT NULL AUTO_INCREMENT,
  `evenement_idevenement` INT NOT NULL,
  `postcode` VARCHAR(45) NULL,
  PRIMARY KEY (`idgast`),
  INDEX `fk_gast_evenement1_idx` (`evenement_idevenement` ASC),
  CONSTRAINT `fk_gast_evenement1`
    FOREIGN KEY (`evenement_idevenement`)
    REFERENCES `mydb`.`evenement` (`idevenement`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`band`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`band` (
  `idband` INT NOT NULL AUTO_INCREMENT,
  `herkomst` VARCHAR(255) NULL,
  `omschrijving` VARCHAR(512) NULL,
  PRIMARY KEY (`idband`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`evenement_has_band`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`evenement_has_band` (
  `evenement_idevenement` INT NOT NULL,
  `band_idband` INT NOT NULL,
  `aantal_sets` INT NOT NULL,
  `duur_set` INT NOT NULL,
  PRIMARY KEY (`evenement_idevenement`, `band_idband`),
  INDEX `fk_evenement_has_band_band1_idx` (`band_idband` ASC),
  INDEX `fk_evenement_has_band_evenement1_idx` (`evenement_idevenement` ASC),
  CONSTRAINT `fk_evenement_has_band_evenement1`
    FOREIGN KEY (`evenement_idevenement`)
    REFERENCES `mydb`.`evenement` (`idevenement`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_evenement_has_band_band1`
    FOREIGN KEY (`band_idband`)
    REFERENCES `mydb`.`band` (`idband`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`band_lid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`band_lid` (
  `idband_lid` INT NOT NULL AUTO_INCREMENT,
  `band_idband` INT NOT NULL,
  `naam` VARCHAR(255) NOT NULL,
  `email_adress` VARCHAR(255) NOT NULL,
  `telefoon_nummer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idband_lid`),
  INDEX `fk_band_lid_band1_idx` (`band_idband` ASC),
  CONSTRAINT `fk_band_lid_band1`
    FOREIGN KEY (`band_idband`)
    REFERENCES `mydb`.`band` (`idband`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`genre` (
  `naam` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`naam`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`band_has_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`band_has_genre` (
  `band_idband` INT NOT NULL,
  `genre_naam` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`band_idband`, `genre_naam`),
  INDEX `fk_band_has_genre_genre1_idx` (`genre_naam` ASC),
  INDEX `fk_band_has_genre_band1_idx` (`band_idband` ASC),
  CONSTRAINT `fk_band_has_genre_band1`
    FOREIGN KEY (`band_idband`)
    REFERENCES `mydb`.`band` (`idband`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_band_has_genre_genre1`
    FOREIGN KEY (`genre_naam`)
    REFERENCES `mydb`.`genre` (`naam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
