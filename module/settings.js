export const registerSettings = function () {
    // Register any custom module settings here
    game.settings.register("5e-exchange-rate", "cp-sp", {
        name: "Copper to Silver",
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "sp-ep", {
        name: "Silver to Electrum",
        scope: "world",
        config: true,
        default: 5,
        type: Number,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "ep-gp", {
        name: "Electrum to Gold",
        scope: "world",
        config: true,
        default: 2,
        type: Number,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "gp-pp", {
        name: "Gold to Platinum",
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "cpAlt", {
        name: "Copper Alt Name",
        scope: "world",
        config: true,
        default: "Copper",
        type: String,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "spAlt", {
        name: "Silver Alt Name",
        scope: "world",
        config: true,
        default: "Silver",
        type: String,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "epAlt", {
        name: "Electrum Alt Name",
        scope: "world",
        config: true,
        default: "Electrum",
        type: String,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "gpAlt", {
        name: "Gold Alt Name",
        scope: "world",
        config: true,
        default: "Gold",
        type: String,
        onChange: () => window.location.reload()
    });
    game.settings.register("5e-exchange-rate", "ppAlt", {
        name: "Platinum Alt Name",
        scope: "world",
        config: true,
        default: "Platinum",
        type: String,
        onChange: () => window.location.reload()
    });
}
