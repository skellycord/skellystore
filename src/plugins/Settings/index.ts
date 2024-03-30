import { after } from "@skellycord/utils/patcher";
import { Plugin } from "@skellycord/apis/plugins";
import { filters, lazy, getViaProps, getViaSource } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";
import { openStorage } from "@skellycord/utils/storage";
import Paw from "./components/Paw";
import css from "./dumb.css";
import SkellySection, { ContextMenuSection } from "./components/SkellySection";
import { FluxDispatcher } from "@skellycord/webpack/common/utils";
import VersionText from "./components/VersionText";
import injectCss from "@skellycord/utils/injectCss";
import { MOD_STORAGE_KEY } from "@skellycord/utils/constants";

injectCss("https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/min/vs/editor/editor.main.css");

export const name = "SkellycordSettings";
export const description = "Shows you this super cool settings page.";
const modSettings = openStorage(MOD_STORAGE_KEY);

export const patches: Plugin["patches"] = [
    {
        find: /.versionHash/,
        replacements: [
            {
                target: /}\)," "/,
                replacement: "}), \" \", $self.makeSectionText()"
            }
        ]
    },
    {
        find: "\"console\"in",
        replacements: [
            {
                target: /switch\((.*)\){(.*)}/,
                replacement: "switch($1){}"
            }
        ]
    },
    {
        // predicate: () => settings.get("firstStart", true),
        find: ".default.Messages.LOADING_DID_YOU_KNOW",
        replacements: [
            {
                target: /(.\.)tip,children:(.)/,
                replacement: () => {
                    let componentContent;
                    if (modSettings.firstStart) componentContent = "['Skellycord is in your discord now?  ',$self.makePaw()]";
                    else componentContent = "$2";

                    return `$1tip,children:${componentContent}`;
                }
            }
        ]
    },
    {
        find: "navId:\"user-settings-cog\"",
        replacements: [
            {
                target: /(.)=\(0,(.)\.default\)\(\)\.filter\((.*)\)\.filter\((.*)\);/,
                replacement: "$1=(0,$2.default)().filter($3).filter($4);$1.splice(0, 0, {" +
                "...$self.SECTION_MIN," +
                "element: $self.makePaw()" +
                "});"
            }
        ]
    }
];

export async function start() {
    const { createToast, showToast } = megaModule ?? await lazy.getViaProps("createToast", "showToast");

    if (modSettings.firstStart) {
        FluxDispatcher.subscribe("CONNECTION_OPEN", () => showToast(createToast("Skellycord Installed!")));
        modSettings.firstStart = false;
    }

    const settingsSect = await lazy.getViaPrototypes("getPredicateSections", "renderSidebar");
    after(settingsSect.prototype, "getPredicateSections", (_, res: any[], ts) => {
        if (!res.find(d => d.label === "User Settings")) return;
        res.splice(0, 0, { 
            label: "Skellycord",
            section: "Skellycord",
            element: () => React.createElement(SkellySection, {
                settings: modSettings,
                context: ts
            }),
            icon: makePaw()
        },
        DIVIDER);

        return res;
    });

    /*const menuThings = getViaProps("Menu", "MenuSpinner");
    after(menuThings, "Menu", (args, res) => {
        console.log(args, res);
    });*/
}

export function stop() {
    css.revert();
}

export function makeSectionText() {
    return React.createElement(VersionText);
}

export function makePaw() {
    return React.createElement(Paw);
}

const DIVIDER = { section: "DIVIDER" };