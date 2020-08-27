# Currency Conversion module for Foundry VTT

Adjust currency conversion rates for 5th Edition D&D

## Preview

## Installation

1. Open Foundry's Setup screen
2. Switch to the "Add-On Modules" tab
3. Click "Install Module"
4. Paste `https://github.com/ktrieun/FVTT-currency-conversion/raw/master/module.json` into the "Manifest URL" field
5. Click "Install"

## Notes

* On saving the settings, refresh the screen in order to update the conversion rates.

### Changing Currency Names on Character Sheet

* You will need access to the files on your Foundry Server.
* In FoundryVTTModulePath/currencyConversion/lang/en.json, you will be able to change the name of the currency there.
* This is mostly superficial as many systems depend on the current currency paradigm, but on your character sheets, it will reference your custom names rather than the D&D 5E standards.

## Compatibility

Currently supports any dnd5e character sheet that doesn't change the name of currency input fields.

## Changelog

### 1.0

* Release
* Basic Currency Conversion Functionality
* Allow users to set conversion rates

### 1.1

* Added rudimentary renaming capability through editing lang/en.json

### 1.2

* Updated for change in Currency Conversion definition in Foundry 5E System
