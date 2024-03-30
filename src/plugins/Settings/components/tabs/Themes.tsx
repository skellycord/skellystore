import { reloadWebThemes } from "@skellycord/apis/themes";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";
import { colors } from "@skellycord/webpack/common/css";

export default function ThemesTab({ settings }) {
    const { 
        Text,
        Card,
        CardTypes,
        TextArea,
        FormTitle
    } = megaModule;

    const { CircleCheckIcon } = getViaProps("CircleCheckIcon");
    const { CircleExclamationPointIcon } = getViaProps("CircleExclamationPointIcon");

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

        { settings.webThemes.split("\n").filter(d => d !== "").map(link => <Card className="SC_pluginCard">
            {/* @ts-ignore update discord-types */}
            <CircleCheckIcon fill="currentColor" style={{ color: colors.GREEN_500 }} />
            <Text>{ link }</Text>
          </Card>)
        }
    </>;
}