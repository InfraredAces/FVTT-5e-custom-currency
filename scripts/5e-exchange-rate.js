Hooks.once("init", () => {
    console.log("5e-exchange-rate | Init");

    conversion_rates();
    console.log("5e-exchange-rate | Conversion Rates");
});
  
Hooks.on("ready", function() {
    console.log("5e-exchange-rate | Ready");
    
    patch_currencyConversion();
    console.log("5e-exchange-rate | patch_currencyConversion")
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

function conversion_rates() {
    game.settings.register("5e-exchange-rate", "cp-sp", {
        name: "Copper to Silver",
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: (newValue) => {
            console.log(`CP to SP Setting changed to ${newValue}.`)
        }
    });
    game.settings.register("5e-exchange-rate", "sp-ep", {
        name: "Silver to Electrum",
        scope: "world",
        config: true,
        default: 5,
        type: Number,
        onChange: (newValue) => {
            console.log(`SP to EP Setting changed to ${newValue}.`)
        }
    });
    game.settings.register("5e-exchange-rate", "ep-gp", {
        name: "Electrum to Gold",
        scope: "world",
        config: true,
        default: 2,
        type: Number,
        onChange: (newValue) => {
            console.log(`5e-exchange-rate to ${newValue}.`)
        }
    });
    game.settings.register("5e-exchange-rate", "gp-pp", {
        name: "Gold to Platinum",
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: (newValue) => {
            console.log(`GP to PP Setting changed to ${newValue}.`)
        }
    });
}