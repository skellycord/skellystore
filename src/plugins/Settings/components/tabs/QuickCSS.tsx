import { reloadQuickCss } from "@skellycord/apis/themes";
import { React, megaModule } from "@skellycord/webpack/common";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/css/css";

export default function QuickCSS({ settings }) {
    const themeContext = megaModule.useThemeContext();
    const [ quickCss, setQuickCss ] = React.useState(settings.quickcss);
    const [ monacoReady, setMonacoReady ] = React.useState(false);

    let editor: monaco.editor.IStandaloneCodeEditor;
    React.useEffect(() => {
        if (monacoReady) return;
        const container = document.getElementById("SC_monaco");
        editor = monaco.editor.create(
            container,
            {
                theme: `vs-${themeContext.theme}`,
                codeLens: false,
                contextmenu: true,
                language: "css",
                colorDecorators: true,
                value: quickCss,
                automaticLayout: true,
            }
        );

        container.style.height = "500px";
        editor.layout();

        editor.getModel().onDidChangeContent(() => {
            settings.quickcss = editor.getValue();
            reloadQuickCss();
            setQuickCss(settings.quickcs);
        });

        setMonacoReady(true);
    }, [quickCss]);
    
    return <div id="SC_monaco" />;
}