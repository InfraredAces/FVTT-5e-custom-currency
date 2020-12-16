// Import TypeScript modules
import { registerSettings } from "./settings.js";

Hooks.once("init", () => {
    console.log("5e-custom-currency | Init");

    registerSettings();
    console.log("5e-custom-currency | Conversion Rates");
});
  
Hooks.on("ready", function() {
    console.log("5e-custom-currency | Ready");
    
    patch_currencyConversion();
    console.log("5e-custom-currency | patch_currencyConversion");

    patch_currencyNames();
    console.log("5e-custom-currency | patch_currencyNames");

});
  
function patch_currencyConversion() {
    let rates = get_conversion_rates();

    CONFIG.DND5E.currencyConversion = {
        cp: {into: "sp", each: rates["cp_sp"]},
        sp: {into: "ep", each: rates["sp_ep"]},
        ep: {into: "gp", each: rates["ep_gp"]},
        gp: {into: "pp", each: rates["gp_pp"]}
    }
};

function get_conversion_rates() {
    return {
        cp_sp: game.settings.get("5e-exchange-rate", "cp-sp"),
        sp_ep: game.settings.get("5e-exchange-rate", "sp-ep"),
        ep_gp: game.settings.get("5e-exchange-rate", "ep-gp"),
        gp_pp: game.settings.get("5e-exchange-rate", "gp-pp")
    }
}

function patch_currencyNames() {
    let altNames = fetchParams();

    CONFIG.DND5E.currencies = {
        "pp": altNames["ppAlt"],
        "gp": altNames["gpAlt"],
        "ep": altNames["epAlt"],
        "sp": altNames["spAlt"],
        "cp": altNames["cpAlt"]
    };
}

function fetchParams() {
    return {
        cpAlt: game.settings.get("5e-exchange-rate", "cpAlt"),
        spAlt: game.settings.get("5e-exchange-rate", "spAlt"),
        epAlt: game.settings.get("5e-exchange-rate", "epAlt"),
        gpAlt: game.settings.get("5e-exchange-rate", "gpAlt"),
        ppAlt: game.settings.get("5e-exchange-rate", "ppAlt")
    }
}
