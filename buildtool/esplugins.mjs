import { readdirSync, existsSync, mkdirSync, promises } from "fs";
import { join } from "path";

export const distPath = join(import.meta.url, "..", "..", "dist").replace("file:", "");
if (!existsSync(distPath)) mkdirSync(distPath);
export const pluginsPath = join(import.meta.url, "..", "..", "src", "plugins").replace("file:", "");
const PLUGIN_INDEX_RE = new RegExp(`plugins\/(${readdirSync(pluginsPath).join("|")})\/index.(mjs|(j|t))s(x)*$`);

// ah the cumcordery of it all
/** @type {import("esbuild").PluginBuild} */
export const cssImport = {
    name: "ConvertCssImport",
    setup: (build) => {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
            let text = await promises.readFile(args.path, "utf8");
            return {
                contents: args.path.includes("plugins") ? 
                `export default require("@skellycord/utils").injectCss(\`${text.replaceAll("\n", "")}\`);` : 
                text,
                loader: args.path.includes("plugins") ? "js" : "css"
            };
        });
    }
};

/** @type {import("esbuild").PluginBuild} */
export const makeManifest = {
    name: "MakeManifest",
    setup: (build) => {
        build.onLoad({ filter: PLUGIN_INDEX_RE }, async (args) => {
            let text = await promises.readFile(args.path, "utf8");
            return { 
                contents: text,
                loader: args.path.split(".").pop()
            }
        });
    }
}