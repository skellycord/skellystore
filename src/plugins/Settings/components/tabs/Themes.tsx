import { reloadWebThemes } from "@skellycord/apis/themes";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";

export default function ThemesTab({ settings }) {
    const { 
        Text,
        TextArea
    } = megaModule;

    const [ links, setLinks ] = React.useState(settings.get("webThemes", ""));

    return <>
        <Text variant="heading-lg/semibold">Online Themes</Text>
        <TextArea
            style={{ fontSize: "13px" }}
            value={links}
            autosize={true}
            onChange={newLinks => {
                settings.set("webThemes", newLinks);
                reloadWebThemes();
                setLinks(newLinks);
            }}
        />
    </>;
}