import { reloadWebThemes } from "@skellycord/apis/themes";
import { joinClassNames } from "@skellycord/utils";
import { React, megaModule } from "@skellycord/webpack/common";
import { margins } from "@skellycord/webpack/common/css";
import ThemeStatusCard from "./ThemeStatusCard";
import { themes } from "@skellycord/apis";

export default function ThemesTab({ settings }) {
    const { 
        TextArea,
        FormTitle,
        FormDivider
    } = megaModule;

    const [ links, setLinks ] = React.useState(settings.webThemes);

    return <>
        <FormTitle>Online Themes</FormTitle>
        <TextArea
            style={{ fontSize: "13px" }}
            value={links}
            autosize={true}
            onChange={newLinks => {
                settings.webThemes = newLinks;
                reloadWebThemes();
                setLinks(newLinks);
            }}
        />

        <FormDivider className={joinClassNames(margins.marginBottom20, margins.marginTop20)} />

        { themes.linkThemes.map((theme, i) => <ThemeStatusCard theme={theme} key={i} themeIndex={i}/>) }
    </>;
}