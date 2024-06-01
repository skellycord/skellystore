import { fetchLocalThemes, reloadWebThemes } from "@skellycord/apis/themes";
import { joinClassNames } from "@skellycord/utils";
import { React, megaModule } from "@skellycord/webpack/common";
import { colors, margins } from "@skellycord/webpack/common/css";
import ThemeStatusCard from "./ThemeStatusCard";
import { themes } from "@skellycord/apis";
import { IS_DESKTOP } from "@skellycord/utils/constants";

export default function ThemesTab({ settings }) {
    const { 
        TextArea,
        FormTitle,
        FormDivider,
        FormSection,
        Text,
        Button
    } = megaModule;

    const [ links, setLinks ] = React.useState(settings.webThemes);

    return <>
        {
            IS_DESKTOP ?
            <>
                <FormTitle>Local Themes</FormTitle>
                <Button onClick={() => fetchLocalThemes().then(reloadWebThemes)}>Add Themes</Button>
                <FormDivider className={joinClassNames(margins.marginBottom20, margins.marginTop20)} />
            </> :
            null
        }

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
        { /* themes.linkThemes.map((theme, i) => <ThemeStatusCard theme={theme} key={i} themeIndex={i} />) */ }
    </>;
}