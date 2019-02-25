-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dungeonBuddiesDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dungeonBuddiesDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dungeonBuddiesDB` DEFAULT CHARACTER SET utf8 ;
USE `dungeonBuddiesDB` ;

-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`DM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`DM` (
  `dmID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dmName` VARCHAR(45) NOT NULL,
  `dmBio` TEXT NOT NULL,
  `dmUserName` VARCHAR(45) NOT NULL,
  `dmCampaignListID` INT NOT NULL,
  PRIMARY KEY (`dmID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Campaign`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Campaign` (
  `campaignID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `campaignDesc` TEXT NOT NULL,
  `campaignTitle` VARCHAR(45) NOT NULL,
  `layoutsData` JSON NULL,
  `settingsData` JSON NULL,
  PRIMARY KEY (`campaignID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Location` (
  `locationID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `coord` POINT NULL,
  `locationTitle` VARCHAR(45) NOT NULL,
  `locationDesc` TEXT NULL,
  PRIMARY KEY (`locationID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`PlotPoint`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`PlotPoint` (
  `plotPointID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `locationID` INT UNSIGNED NULL,
  `plotPointTitle` VARCHAR(45) NOT NULL,
  `plotPointDesc` TEXT NULL,
  PRIMARY KEY (`plotPointID`),
  INDEX `plotpoint_location_fk_idx` (`locationID` ASC),
  CONSTRAINT `plotpoint_location_fk`
    FOREIGN KEY (`locationID`)
    REFERENCES `dungeonBuddiesDB`.`Location` (`locationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Feat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Feat` (
  `featID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `featName` VARCHAR(45) NOT NULL,
  `featDesc` TEXT NOT NULL,
  `featLevel` INT NOT NULL,
  PRIMARY KEY (`featID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Klass`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Klass` (
  `klassID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `klassName` VARCHAR(45) NOT NULL,
  `hitDie` INT NOT NULL,
  `magicAble` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`klassID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Subklass`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Subklass` (
  `subklassID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `klassID` INT UNSIGNED NOT NULL,
  `subklassName` VARCHAR(45) NOT NULL,
  `subclassFlavor` VARCHAR(45) NOT NULL,
  `subklassDesc` TEXT NOT NULL,
  PRIMARY KEY (`subklassID`, `klassID`),
  CONSTRAINT `subclass_class_fk`
    FOREIGN KEY (`klassID`)
    REFERENCES `dungeonBuddiesDB`.`Klass` (`klassID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Race`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Race` (
  `raceID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `raceName` VARCHAR(45) NOT NULL,
  `raceSpeed` INT NOT NULL,
  `alignment` TEXT NOT NULL,
  `raceAge` TEXT NOT NULL,
  `raceSize` VARCHAR(45) NOT NULL,
  `raceSizeDesc` TEXT NOT NULL,
  `languageDesc` TEXT NOT NULL,
  PRIMARY KEY (`raceID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Character`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Character` (
  `characterID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `characterName` VARCHAR(45) NOT NULL,
  `raceID` INT UNSIGNED NOT NULL,
  `klassID` INT UNSIGNED NOT NULL,
  `level` INT UNSIGNED NOT NULL DEFAULT 1,
  `alignment` TEXT NULL,
  `hp` INT UNSIGNED NOT NULL,
  `currencyCP` INT UNSIGNED NOT NULL DEFAULT 0,
  `currencySP` INT UNSIGNED NOT NULL DEFAULT 0,
  `currencyEP` INT UNSIGNED NOT NULL DEFAULT 0,
  `currencyGP` INT UNSIGNED NOT NULL DEFAULT 0,
  `currencyPP` INT UNSIGNED NOT NULL DEFAULT 0,
  `strength` INT UNSIGNED NOT NULL DEFAULT 1,
  `dexterity` INT UNSIGNED NOT NULL DEFAULT 1,
  `constitution` INT UNSIGNED NOT NULL DEFAULT 1,
  `intelligence` INT UNSIGNED NOT NULL DEFAULT 1,
  `wisdom` INT UNSIGNED NOT NULL DEFAULT 1,
  `charism` INT UNSIGNED NOT NULL DEFAULT 1,
  `characterDesc` TEXT NULL,
  `backstory` TEXT NULL,
  `height` VARCHAR(15) NOT NULL,
  `weight` INT NOT NULL,
  `age` INT NOT NULL,
  `skinDesc` TEXT NOT NULL,
  `hairDesc` TEXT NOT NULL,
  PRIMARY KEY (`characterID`),
  INDEX `character_class_fk_idx` (`klassID` ASC),
  INDEX `character_race_fk_idx` (`raceID` ASC),
  CONSTRAINT `character_class_fk`
    FOREIGN KEY (`klassID`)
    REFERENCES `dungeonBuddiesDB`.`Klass` (`klassID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `character_race_fk`
    FOREIGN KEY (`raceID`)
    REFERENCES `dungeonBuddiesDB`.`Race` (`raceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`SpellSchool`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`SpellSchool` (
  `schoolID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `schoolName` VARCHAR(45) NOT NULL,
  `schoolDesc` TEXT NOT NULL,
  PRIMARY KEY (`schoolID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Spell`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Spell` (
  `spellID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `spellName` VARCHAR(45) NOT NULL,
  `spellDesc` TEXT NOT NULL,
  `spellHigherLevelDesc` TEXT NULL,
  `spellRange` VARCHAR(45) NOT NULL,
  `spellMaterial` TEXT NULL,
  `ritual` TINYINT(1) NOT NULL DEFAULT 0,
  `duration` VARCHAR(45) NULL,
  `concentration` TINYINT(1) NOT NULL,
  `castingTime` VARCHAR(45) NOT NULL,
  `schoolID` INT UNSIGNED NOT NULL,
  `componentV` TINYINT(1) NOT NULL,
  `componentS` TINYINT(1) NOT NULL,
  `componentM` TINYINT(1) NOT NULL,
  PRIMARY KEY (`spellID`),
  INDEX `spell_spellschool_fk_idx` (`schoolID` ASC),
  CONSTRAINT `spell_spellschool_fk`
    FOREIGN KEY (`schoolID`)
    REFERENCES `dungeonBuddiesDB`.`SpellSchool` (`schoolID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`DamageType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`DamageType` (
  `damageTypeID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `damageTypeName` VARCHAR(45) NOT NULL,
  `damageTypeDesc` TEXT NOT NULL,
  PRIMARY KEY (`damageTypeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`WeaponStat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`WeaponStat` (
  `weaponStatID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `damageTypeID` INT UNSIGNED NOT NULL,
  `weaponType` VARCHAR(45) NOT NULL,
  `diceCount` INT NOT NULL,
  `diceValue` INT NOT NULL,
  `rangeNormal` INT NOT NULL,
  `rangeLong` INT NULL,
  `vDiceCount` INT NULL COMMENT 'For use with \"versatile\" property',
  `vDiceValue` INT NULL COMMENT 'For use with \"versatile\" property',
  PRIMARY KEY (`weaponStatID`),
  INDEX `weaponstat_damagetype_fk_idx` (`damageTypeID` ASC),
  CONSTRAINT `weaponstat_damagetype_fk`
    FOREIGN KEY (`damageTypeID`)
    REFERENCES `dungeonBuddiesDB`.`DamageType` (`damageTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Equipment` (
  `equipmentID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `weaponStatID` INT UNSIGNED NULL,
  `equipmentName` VARCHAR(45) NOT NULL,
  `equipmentDesc` TEXT NULL,
  `categoryName` VARCHAR(45) NOT NULL,
  `subcategoryName` VARCHAR(45) NOT NULL,
  `equipmentWeight` DOUBLE NULL,
  `costQuantity` INT NOT NULL,
  `costUnit` VARCHAR(2) NOT NULL,
  `speedQuantity` DOUBLE NULL,
  `speedUnit` VARCHAR(20) NULL,
  PRIMARY KEY (`equipmentID`),
  INDEX `equipment_weaponstat_fk_idx` (`weaponStatID` ASC),
  CONSTRAINT `equipment_weaponstat_fk`
    FOREIGN KEY (`weaponStatID`)
    REFERENCES `dungeonBuddiesDB`.`WeaponStat` (`weaponStatID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`AbilityScore`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`AbilityScore` (
  `abilityScoreID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `abilityScoreName` VARCHAR(45) NOT NULL,
  `abilityScoreDesc` TEXT NOT NULL,
  PRIMARY KEY (`abilityScoreID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`SavingThrowList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`SavingThrowList` (
  `klassID` INT UNSIGNED NOT NULL,
  `abilitiyScoreID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`klassID`, `abilitiyScoreID`),
  INDEX `savingthrowlist_abilityscore_fk_idx` (`abilitiyScoreID` ASC),
  CONSTRAINT `savingthrowlist_class_fk`
    FOREIGN KEY (`klassID`)
    REFERENCES `dungeonBuddiesDB`.`Klass` (`klassID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `savingthrowlist_abilityscore_fk`
    FOREIGN KEY (`abilitiyScoreID`)
    REFERENCES `dungeonBuddiesDB`.`AbilityScore` (`abilityScoreID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`SpellList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`SpellList` (
  `spellID` INT UNSIGNED NOT NULL,
  `characterID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`spellID`, `characterID`),
  INDEX `spelllist_character_fk_idx` (`characterID` ASC),
  CONSTRAINT `spelllist_spell_fk`
    FOREIGN KEY (`spellID`)
    REFERENCES `dungeonBuddiesDB`.`Spell` (`spellID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `spelllist_character_fk`
    FOREIGN KEY (`characterID`)
    REFERENCES `dungeonBuddiesDB`.`Character` (`characterID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`EquipmentList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`EquipmentList` (
  `equipmentID` INT UNSIGNED NOT NULL,
  `characterID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`equipmentID`, `characterID`),
  INDEX `equipmentlist_character_fk_idx` (`characterID` ASC),
  CONSTRAINT `equipmentlist_equipment_fk`
    FOREIGN KEY (`equipmentID`)
    REFERENCES `dungeonBuddiesDB`.`Equipment` (`equipmentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `equipmentlist_character_fk`
    FOREIGN KEY (`characterID`)
    REFERENCES `dungeonBuddiesDB`.`Character` (`characterID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`CampaignList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`CampaignList` (
  `dmID` INT UNSIGNED NOT NULL,
  `campaignID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`dmID`, `campaignID`),
  INDEX `campaign_fk_idx` (`campaignID` ASC),
  CONSTRAINT `campaignlist_dm_fk`
    FOREIGN KEY (`dmID`)
    REFERENCES `dungeonBuddiesDB`.`DM` (`dmID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `campaignlist_campaign_fk`
    FOREIGN KEY (`campaignID`)
    REFERENCES `dungeonBuddiesDB`.`Campaign` (`campaignID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`CharacterList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`CharacterList` (
  `characterID` INT UNSIGNED NOT NULL,
  `campaignID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`characterID`, `campaignID`),
  INDEX `charlist_campaign_fk_idx` (`campaignID` ASC),
  CONSTRAINT `charlist_campaign_fk`
    FOREIGN KEY (`campaignID`)
    REFERENCES `dungeonBuddiesDB`.`Campaign` (`campaignID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `charlist_character_fk`
    FOREIGN KEY (`characterID`)
    REFERENCES `dungeonBuddiesDB`.`Character` (`characterID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`LocationList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`LocationList` (
  `locationID` INT UNSIGNED NOT NULL,
  `campaignID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`locationID`, `campaignID`),
  INDEX `ll_campaign_fk_idx` (`campaignID` ASC),
  CONSTRAINT `locationlist_location_fk`
    FOREIGN KEY (`locationID`)
    REFERENCES `dungeonBuddiesDB`.`Location` (`locationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `locationlist_campaign_fk`
    FOREIGN KEY (`campaignID`)
    REFERENCES `dungeonBuddiesDB`.`Campaign` (`campaignID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`PlotPointList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`PlotPointList` (
  `plotPointID` INT UNSIGNED NOT NULL,
  `campaignID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`plotPointID`, `campaignID`),
  INDEX `plotpointlist_campaign_fk_idx` (`campaignID` ASC),
  CONSTRAINT `plotpointlist_plotpoint_fk`
    FOREIGN KEY (`plotPointID`)
    REFERENCES `dungeonBuddiesDB`.`PlotPoint` (`plotPointID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `plotpointlist_campaign_fk`
    FOREIGN KEY (`campaignID`)
    REFERENCES `dungeonBuddiesDB`.`Campaign` (`campaignID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`FeatList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`FeatList` (
  `featID` INT UNSIGNED NOT NULL,
  `characterID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`featID`, `characterID`),
  INDEX `featlist_character_fk_idx` (`characterID` ASC),
  CONSTRAINT `featlist_feat_fk`
    FOREIGN KEY (`featID`)
    REFERENCES `dungeonBuddiesDB`.`Feat` (`featID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `featlist_character_fk`
    FOREIGN KEY (`characterID`)
    REFERENCES `dungeonBuddiesDB`.`Character` (`characterID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Skill` (
  `skillID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `abilityScoreID` INT UNSIGNED NOT NULL,
  `skillName` VARCHAR(45) NOT NULL,
  `skillDesc` TEXT NOT NULL,
  PRIMARY KEY (`skillID`),
  INDEX `skill_abilityScore_fk_idx` (`abilityScoreID` ASC),
  CONSTRAINT `skill_abilityScore_fk`
    FOREIGN KEY (`abilityScoreID`)
    REFERENCES `dungeonBuddiesDB`.`AbilityScore` (`abilityScoreID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`SpellKlassList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`SpellKlassList` (
  `spellID` INT UNSIGNED NOT NULL,
  `klassID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`spellID`, `klassID`),
  INDEX `spellklasslist_klass_fk_idx` (`klassID` ASC),
  CONSTRAINT `spellklasslist_klass_fk`
    FOREIGN KEY (`klassID`)
    REFERENCES `dungeonBuddiesDB`.`Klass` (`klassID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `spellklasslist_spell_fk`
    FOREIGN KEY (`spellID`)
    REFERENCES `dungeonBuddiesDB`.`Spell` (`spellID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Language` (
  `languageID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `languageName` VARCHAR(45) NOT NULL,
  `languageType` VARCHAR(45) NOT NULL,
  `languageScript` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`languageID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`LanguageList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`LanguageList` (
  `languageID` INT UNSIGNED NOT NULL,
  `raceID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`languageID`, `raceID`),
  INDEX `languagelist_race_fk_idx` (`raceID` ASC),
  CONSTRAINT `languagelist_language_fk`
    FOREIGN KEY (`languageID`)
    REFERENCES `dungeonBuddiesDB`.`Language` (`languageID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `languagelist_race_fk`
    FOREIGN KEY (`raceID`)
    REFERENCES `dungeonBuddiesDB`.`Race` (`raceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Trait`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Trait` (
  `traitID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `traitName` VARCHAR(45) NOT NULL,
  `traitDesc` TEXT NOT NULL,
  PRIMARY KEY (`traitID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`TraitList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`TraitList` (
  `raceID` INT UNSIGNED NOT NULL,
  `traitID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`raceID`, `traitID`),
  INDEX `traitlist_trait_fk_idx` (`traitID` ASC),
  CONSTRAINT `traitlist_race_fk`
    FOREIGN KEY (`raceID`)
    REFERENCES `dungeonBuddiesDB`.`Race` (`raceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `traitlist_trait_fk`
    FOREIGN KEY (`traitID`)
    REFERENCES `dungeonBuddiesDB`.`Trait` (`traitID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`Proficiency`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`Proficiency` (
  `proficiencyID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `proficiencyName` VARCHAR(45) NOT NULL,
  `proficiencyDesc` TEXT NOT NULL,
  PRIMARY KEY (`proficiencyID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`ProficiencyList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`ProficiencyList` (
  `characterID` INT UNSIGNED NOT NULL,
  `proficiencyID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`characterID`, `proficiencyID`),
  INDEX `proficiencylist_proficiency_fk_idx` (`proficiencyID` ASC),
  CONSTRAINT `proficiencylist_proficiency_fk`
    FOREIGN KEY (`proficiencyID`)
    REFERENCES `dungeonBuddiesDB`.`Proficiency` (`proficiencyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `proficiencylist_character_fk`
    FOREIGN KEY (`characterID`)
    REFERENCES `dungeonBuddiesDB`.`Character` (`characterID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`FeatKlassList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`FeatKlassList` (
  `featID` INT UNSIGNED NOT NULL,
  `klassID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`featID`, `klassID`),
  INDEX `featklasslist_klass_fk_idx` (`klassID` ASC),
  CONSTRAINT `featklasslist_feat_fk`
    FOREIGN KEY (`featID`)
    REFERENCES `dungeonBuddiesDB`.`Feat` (`featID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `featklasslist_klass_fk`
    FOREIGN KEY (`klassID`)
    REFERENCES `dungeonBuddiesDB`.`Klass` (`klassID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`FeatSubklassList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`FeatSubklassList` (
  `featID` INT UNSIGNED NOT NULL,
  `subklassID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`featID`, `subklassID`),
  INDEX `featsubklasslist_subklass_fk_idx` (`subklassID` ASC),
  CONSTRAINT `featsubklasslist_feat_fk`
    FOREIGN KEY (`featID`)
    REFERENCES `dungeonBuddiesDB`.`Feat` (`featID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `featsubklasslist_subklass_fk`
    FOREIGN KEY (`subklassID`)
    REFERENCES `dungeonBuddiesDB`.`Subklass` (`subklassID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`WeaponProperty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`WeaponProperty` (
  `weaponPropertyID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `weaponPropetyName` VARCHAR(45) NOT NULL,
  `weaponPropertyDesc` TEXT NOT NULL COMMENT 'Weapon Property>Special note: the \"Special\" property description needs to come from the *weapon itself,* found in 5e-SRD-Equipment.json',
  PRIMARY KEY (`weaponPropertyID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeonBuddiesDB`.`WeaponPropertyList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeonBuddiesDB`.`WeaponPropertyList` (
  `weaponStatID` INT UNSIGNED NOT NULL,
  `weaponPropertyID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`weaponStatID`, `weaponPropertyID`),
  INDEX `weaponpropertylist_weaponproperty_fk_idx` (`weaponPropertyID` ASC),
  CONSTRAINT `weaponpropertylist_weaponstat_fk`
    FOREIGN KEY (`weaponStatID`)
    REFERENCES `dungeonBuddiesDB`.`WeaponStat` (`weaponStatID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `weaponpropertylist_weaponproperty_fk`
    FOREIGN KEY (`weaponPropertyID`)
    REFERENCES `dungeonBuddiesDB`.`WeaponProperty` (`weaponPropertyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
