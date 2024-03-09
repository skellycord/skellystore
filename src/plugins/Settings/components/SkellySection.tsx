import { TabBar } from "@skellycord/components";
import { React, megaModule } from "@skellycord/webpack/common";
import General from "./tabs/General";
import Plugins from "./tabs/Plugins";
import QuickCSS from "./tabs/QuickCSS";
import ThemesTab from "./tabs/Themes";
import UpdaterTab from "./tabs/Updater";
import { getViaProps } from "@skellycord/webpack";

const COOL_SECTIONS = ["General", "Plugins", "Themes", "QuickCSS", "Updater"];

export default function SkellySection({ settings, context }) {
    const _TabBar = TabBar();
    const { NumberBadge } = getViaProps("NumberBadge", "IconBadge");
    const { Text } = megaModule;

    const sectionCopy = COOL_SECTIONS;
    /*React.useEffect(() => {
        sectionCopy[4] = <Text className="SC_marginRight8" style={{ display: "flex" }}>
            Updater
            <NumberBadge className="SC_updatePing" count={20} />
        </Text>;
    });*/

    const [ currentTab, setTab ] = React.useState(0);
    let CurrentTab;

    switch (COOL_SECTIONS[currentTab]) {
        case "General":  
            CurrentTab = General;
            break;
        case "Plugins": 
            CurrentTab = Plugins;
            break;
        case "Themes": 
            CurrentTab = ThemesTab;
            break;
        case "QuickCSS":
            CurrentTab = QuickCSS;
            break;
        case "Updater":
            CurrentTab = UpdaterTab;
            break;
    }

    return <>
        <_TabBar 
            items={sectionCopy} 
            initTab={currentTab} 
            onChange={v => setTab(sectionCopy.findIndex(s => s === v))} 
        />

        <CurrentTab {...{ settings, context }} />
    </>;
}

export function ContextMenuSection() {
    const { MenuItem, MenuGroup } = megaModule;
    const { open } = getViaProps("open", "init", "saveAccountChanges");
    return <MenuGroup>
        <MenuItem
            id="bork"
            label="Skellycord"
            action={()=>open("Skellycord")}
        />
    </MenuGroup>;
}