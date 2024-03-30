import { Plugin } from "@skellycord/apis/plugins";
import { openStorage } from "@skellycord/utils/storage";
import { getViaProps, getViaStoreName } from "@skellycord/webpack/lazy";

const pluginLol: Plugin = {
    name: "LogOverride",
    description: "Overrides discord's devtools logging.",
    /*patches: [
        {
            find: "console\.",
            replacements: [{
                target: /console\.(.*)\((.*)\)/,
                replacement: "console.$1.call(this, $2)"
            }]
        },
    ],*/

    async start() {
        const logSettings = openStorage(pluginLol.name, {
            log: true,
            info: false,
            warn: false,
            error: true,
            debug: false,
            "file-only": false
        });

        const { setLogFn } = await getViaProps("setLogFn");
        setLogFn((source, level, msg) => {
            if (!logSettings[level]) return;

            if (level === "file-only") level = "log";

            console[level].call({}, `%c[${source}]`, "font-weight:bold;color:purple;", msg);
        });
    }
};

export default pluginLol;