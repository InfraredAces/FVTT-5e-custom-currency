// Import
import { registerSettings } from "./settings.js";

// Base Hooks
Hooks.once("init", () => {
    console.log("5e-custom-currency | Init");

    registerSettings();
});

Hooks.on("ready", function() {
    console.log("5e-custom-currency | Ready");

    patch_currencyNames();
    console.log("5e-custom-currency | patch_currencyNames");
    
    if (game.settings.get("5e-custom-currency", "depCur"))
    {
        patch_currencyConversion();
        console.log("5e-custom-currency | patch_currencyConversion");
    }
    else {
        console.log("5e-custom-currency | Using Independent Currencies");
        independentCurrency();
    }
});

Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
    if(!game.settings.get("5e-custom-currency", "depCur")) {
        html.find('[class="currency-convert-button"]').remove();
        html.find('[data-action="convertCurrency"]').remove();
        html.find('[title="Convert Currency"]').remove();
    }
    alterCharacterCurrency(html);
});

//  Base Functions

export function patch_currencyConversion() {
    let rates = get_conversion_rates();
}

function get_conversion_rates() {
    return {
        cp_sp: game.settings.get("5e-custom-currency", "cp-sp"),
        sp_ep: game.settings.get("5e-custom-currency", "sp-ep"),
        ep_gp: game.settings.get("5e-custom-currency", "ep-gp"),
        gp_pp: game.settings.get("5e-custom-currency", "gp-pp")
    }
}

function fetchParams() {
    return {
        cpAlt: game.settings.get("5e-custom-currency", "cpAlt"),
        spAlt: game.settings.get("5e-custom-currency", "spAlt"),
        epAlt: game.settings.get("5e-custom-currency", "epAlt"),
        gpAlt: game.settings.get("5e-custom-currency", "gpAlt"),
        ppAlt: game.settings.get("5e-custom-currency", "ppAlt"),
        cpAltAbrv: game.settings.get("5e-custom-currency", "cpAltAbrv"),
        spAltAbrv: game.settings.get("5e-custom-currency", "spAltAbrv"),
        epAltAbrv: game.settings.get("5e-custom-currency", "epAltAbrv"),
        gpAltAbrv: game.settings.get("5e-custom-currency", "gpAltAbrv"),
        ppAltAbrv: game.settings.get("5e-custom-currency", "ppAltAbrv"),

    }
}

export function patch_currencyConversion() {
    let rates = get_conversion_rates();

    CONFIG.DND5E.currencyConversion = {
        cp: {into: "sp", each: rates["cp_sp"]},
        sp: {into: "ep", each: rates["sp_ep"]},
        ep: {into: "gp", each: rates["ep_gp"]},
        gp: {into: "pp", each: rates["gp_pp"]}
    }
};

export function patch_currencyNames() {
    let altNames = fetchParams();

    CONFIG.DND5E.currencies = {
        "pp": altNames["ppAlt"],
        "gp": altNames["gpAlt"],
        "ep": altNames["epAlt"],
        "sp": altNames["spAlt"],
        "cp": altNames["cpAlt"]
    };
}

function alterCharacterCurrency(html) {
    let altNames = fetchParams();
    html.find('[class="denomination pp"]').text(altNames["ppAltAbrv"]);
    html.find('[class="denomination gp"]').text(altNames["gpAltAbrv"]);
    html.find('[class="denomination ep"]').text(altNames["epAltAbrv"]);
    html.find('[class="denomination sp"]').text(altNames["spAltAbrv"]);
    html.find('[class="denomination cp"]').text(altNames["cpAltAbrv"]);
}

function independentCurrency() {
    CONFIG.Actor.entityClass.prototype.convertCurrency = function () {
    };
}

// Compatibility: Tidy5E

Hooks.on('renderActorSheet5eNPC', (sheet, html) => {
    if (game.modules.get('tidy5e-sheet')?.active && sheet.constructor.name === 'Tidy5eNPC') {
        alterCharacterCurrency(html);
    }
});

// Compatibility: Let's Trade 5E
Hooks.on('renderTradeWindow', (sheet, html) => {
    alterTradeWindowCurrency(html);
});

Hooks.on('renderDialog', (sheet, html) => {
    if (game.modules.get('5e-custom-currency')?.active && sheet.title === 'Incoming Trade Request') {
        alterTradeDialogCurrency(html);
    }
});

function alterTradeDialogCurrency(html) {
    let altNames = fetchParams();

    const content = html.find('.dialog-content p');
    const match = content.text().match(/.+ is sending you [0-9]+((pp|gp|ep|sp|cp) \.).+/);
    if (match) content.text(content.text().replace(match[1], ' ' + altNames[match[2] + "Alt"] + '.'));
}

function alterTradeWindowCurrency(html) {
    let altNames = fetchParams();

    ['pp', 'gp', 'ep', 'sp', 'cp'].forEach(dndCurrency => {
        const container = html.find('[data-coin="' + dndCurrency + '"]').parent();
        if (!container.length) return;

        for (const [k, n] of Object.entries(container.contents())) {
            if (n.nodeType === Node.TEXT_NODE) n.remove();
        }

        container.append(' ' + altNames[dndCurrency + "AltAbrv"]);
        container.attr('title', altNames[dndCurrency + "Alt"]);
    });
}
