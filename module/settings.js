import { patch_currencyConversion } from "./5e-custom-currency.js";
import { patch_currencyNames } from "./5e-custom-currency.js";

function patch() {
    patch_currencyConversion();
    patch_currencyNames();
}

export function registerSettingsCurrencyNames() {
    game.settings.register("5e-custom-currency", "cpAlt", {
        name: "Copper Alt Name",
        scope: "world",
        config: true,
        default: "Copper",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "spAlt", {
        name: "Silver Alt Name",
        scope: "world",
        config: true,
        default: "Silver",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "epAlt", {
        name: "Electrum Alt Name",
        scope: "world",
        config: true,
        default: "Electrum",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "gpAlt", {
        name: "Gold Alt Name",
        scope: "world",
        config: true,
        default: "Gold",
        type: String,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "ppAlt", {
        name: "Platinum Alt Name",
        scope: "world",
        config: true,
        default: "Platinum",
        type: String,
        onChange: () => patch(),
    });
}

export function registerSettingsExchangeRate() {
    let cpAlt = game.settings.get("5e-custom-currency", "cpAlt");
    let spAlt = game.settings.get("5e-custom-currency", "spAlt");
    let epAlt = game.settings.get("5e-custom-currency", "epAlt");
    let gpAlt = game.settings.get("5e-custom-currency", "gpAlt");
    let ppAlt = game.settings.get("5e-custom-currency", "ppAlt");
    
    game.settings.register("5e-custom-currency", "cp-sp", {
        name:  cpAlt + " to " + spAlt,
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "sp-ep", {
        name: spAlt + " to " + epAlt,
        scope: "world",
        config: true,
        default: 5,
        type: Number,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "ep-gp", {
        name: epAlt + " to " + gpAlt,
        scope: "world",
        config: true,
        default: 2,
        type: Number,
        onChange: () => patch(),
    });
    game.settings.register("5e-custom-currency", "gp-pp", {
        name: gpAlt + " to " + ppAlt,
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: () => patch(),
    });
}
