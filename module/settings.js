export const registerSettings = function () {
    // Register any custom module settings here
    game.settings.register("5e-exchange-rate", "cp-sp", {
        name: "Copper to Silver",
        hint: "Refresh window to update converstion rates",
        scope: "world",
        config: true,
        default: 10,
        type: Number
    });
    game.settings.register("5e-exchange-rate", "sp-ep", {
        name: "Silver to Electrum",
        scope: "world",
        config: true,
        default: 5,
        type: Number
    });
    game.settings.register("5e-exchange-rate", "ep-gp", {
        name: "Electrum to Gold",
        scope: "world",
        config: true,
        default: 2,
        type: Number
    });
    game.settings.register("5e-exchange-rate", "gp-pp", {
        name: "Gold to Platinum",
        scope: "world",
        config: true,
        default: 10,
        type: Number
    });
}