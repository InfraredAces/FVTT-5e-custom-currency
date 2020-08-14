import Actor5e from "../../../systems/dnd5e/module/actor/entity.js";

Hooks.once("init", () => {
  console.log("convert-currency | Init");
  conversion_rates();
  patch_CurrencyConversion();
  console.log("convert-currency | patch_CurrencyConversion")

});
  
  Hooks.on("ready", function() {
    console.log("convert-currency | Ready");
  });
  
function patch_CurrencyConversion() {
    rates = get_rates();

    Actor5e.prototype.convertCurrency = function () {
        const curr = duplicate(this.data.data.currency);
        const convert = {
            cp: {into: "sp", each: rates["cp-sp"]},
            sp: {into: "ep", each: rates["sp-ep"]},
            ep: {into: "gp", each: rates["ep-gp"]},
            gp: {into: "pp", each: rates["gp-pp"]}
        };
        for ( let [c, t] of Object.entries(convert) ) {
            let change = Math.floor(curr[c] / t.each);
            curr[c] -= (change * t.each);
            curr[t.into] += change;
        }
        return this.update({"data.currency": curr});
    };
};

function get_rates() {
    return rates = {
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