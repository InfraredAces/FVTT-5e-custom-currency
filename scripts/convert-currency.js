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
    Actor5e.prototype.convertCurrency = function () {
        const curr = duplicate(this.data.data.currency);
        const convert = {
            cp: {into: "sp", each: 100},
            sp: {into: "ep", each: 10 },
            ep: {into: "gp", each: 10 },
            gp: {into: "pp", each: 100}
        };
        for ( let [c, t] of Object.entries(convert) ) {
            let change = Math.floor(curr[c] / t.each);
            curr[c] -= (change * t.each);
            curr[t.into] += change;
        }
        return this.update({"data.currency": curr});
    };
};

function conversion_rates() {
    game.settings.register("currencyConversion", "cp-sp", {
        name: "Copper to Silver Rate",
        scope: "world",
        config: true,
        default: false,
        type: Number
      });
}