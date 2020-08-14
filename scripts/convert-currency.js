import Actor5e from "../../../systems/dnd5e/module/actor/entity.js";

Hooks.once("init", () => {
    console.log("convert-currency | Init");
    conversion_rates();
    console.log("convert-currency | patch_CurrencyConversion")
});
  
Hooks.on("ready", function() {
    console.log("convert-currency | Ready");
    patch_CurrencyConversion();
});
  
function patch_CurrencyConversion() {
    let rates = get_conversion_rates();

    Actor5e.prototype.convertCurrency = function () {
        const curr = duplicate(this.data.data.currency);
        const convert = {
          cp: {into: "sp", each: rates["cp_sp"]},
          sp: {into: "ep", each: rates["sp_ep"]},
          ep: {into: "gp", each: rates["ep_gp"]},
          gp: {into: "pp", each: rates["gp_pp"]}
        };
        for ( let [c, t] of Object.entries(convert) ) {
            let change = Math.floor(curr[c] / t.each);
            curr[c] -= (change * t.each);
            curr[t.into] += change;
        }
        return this.update({"data.currency": curr});
    };
};

function get_conversion_rates() {
    return {
        cp_sp: game.settings.get("currencyConversion", "cp-sp"),
        sp_ep: game.settings.get("currencyConversion", "sp-ep"),
        ep_gp: game.settings.get("currencyConversion", "ep-gp"),
        gp_pp: game.settings.get("currencyConversion", "gp-pp")
    }
}

function conversion_rates() {
    game.settings.register("currencyConversion", "cp-sp", {
        name: "Copper to Silver",
        scope: "world",
        config: true,
        default: 10,
        type: Number
    });
    game.settings.register("currencyConversion", "sp-ep", {
        name: "Silver to Electrum",
        scope: "world",
        config: true,
        default: 5,
        type: Number
    });
    game.settings.register("currencyConversion", "ep-gp", {
        name: "Electrum to Gold",
        scope: "world",
        config: true,
        default: 2,
        type: Number
    });
    game.settings.register("currencyConversion", "gp-pp", {
        name: "Gold to Platinum",
        scope: "world",
        config: true,
        default: 10,
        type: Number
    });
}