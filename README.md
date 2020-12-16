# 5E Custom Currency module for Foundry VTT

Adjust currency name and conversion rates for 5th Edition D&D

## Installation

1. Open Foundry's Setup screen
2. Switch to the "Add-On Modules" tab
3. Click "Install Module"
4. Paste `https://raw.githubusercontent.com/ktrieun/FVTT-5e-custom-currency/master/module.json` into the "Manifest URL" field
5. Click "Install"

## Notes

* On saving the settings, reopen any character sheets in order to update settings.

### Changing Currency Names on Character Sheet
* This is mostly superficial as many systems depend on the current currency paradigm, but on your character sheets, it will reference your custom names rather than the D&D 5E standards.

## Compatibility

Currently supports any dnd5e character sheet that uses the default currency names and exchange rates from the DND5E config.js file.

### Confirmed Compatible
* Default 5e Character Sheet
* Tidy5e Sheet
* DNDBeyond Character Sheet for 5e

### Not Compatible

* D&D 5e OGL Character Sheet
* Compact DnDBeyond 5e Character Sheet

## Changelog

### 1.0

* Release
* Basic Currency Conversion Functionality
* Allow users to set conversion rates

### 1.1

* Added rudimentary renaming capability through editing lang/en.json

### 1.2

* Change name from Currency Converter to 5th Edition Exchange Rate
* Updated for change in Currency Conversion definition in Foundry 5E System

### 1.3

* Completed custom currency name feature and verified function in FVTT 0.7.8 and DND5E 0.99

#### 1.31

* Added Independent Currency Setting
