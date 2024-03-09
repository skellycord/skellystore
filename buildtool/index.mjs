import { readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

import monacoEditorPlugin from "esbuild-monaco-editor-plugin";
import { cssImport, pluginsPath, distPath } from "./esplugins.mjs";
import { build } from "esbuild";
import packageFile from "../package.json" assert { type: "json" };

async function _build() {
    const buildRes = await build({ 
        entryPoints: [join(pluginsPath, "index")],
        outfile: "./dist/store.js",
        platform: "browser",
        write: false,
        minify: true,
        bundle: true,
        keepNames: true,
        globalName: "PluginStore",
        loader: {
            ".json": "json",
            ".ttf": "text"
        },
        footer: {
            js: "window.skellycord.apis.plugins.loadStore(Manifest,PluginStore.default);"
        },
        conditions: ["@skellycord/*"],
        external: ["@skellycord/*", "react"],
        plugins: [
            monacoEditorPlugin({ languages: ["css", "js"] }),
            cssImport
        ]
    });

    for (const file of buildRes.outputFiles) {
        if (!file.path.includes("store.js")) {
            writeFileSync(file.path, file.text);
            continue;
        }
        
        let code = file.text;
        
        code = code.replace(
            /function\((.)\){if\(typeof require<"."\)return require.apply\(this,arguments\);throw Error\('Dynamic require of "'\+.\+'" is not supported'\)}/, 
            "function(e){try{return(0,eval)(\"window\"+e.replace(\"@\",\".\").replaceAll(\"/\",\".\"))}catch{console.error(\"Cannot resolve module \"+e)}}"
        );

        writeFileSync(file.path, code);
    }

    const manifest = {
        name: packageFile.name,
        description: packageFile.description,
        author: packageFile.author
    };

    writeFileSync(join(distPath, "manifest.json"), JSON.stringify(manifest));
}

_build();