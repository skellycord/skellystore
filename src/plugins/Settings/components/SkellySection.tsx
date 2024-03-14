import { React, megaModule } from "@skellycord/webpack/common";
import General from "./tabs/General";
import Plugins from "./tabs/Plugins";
import QuickCSS from "./tabs/QuickCSS";
import ThemesTab from "./tabs/Themes";
import UpdaterTab from "./tabs/Updater";
import { getViaProps } from "@skellycord/webpack";
import { RELEASE_STATE } from "@skellycord/utils/constants";
import DevTab from "./tabs/Dev";

const DUMB_SECTIONS = [
    {
        section: "General",
        id: "general"
    },
    {
        section: "Plugins",
        id: "plugins"
    },
    {
        section: "Themes",
        id: "themes"
    },
    {
        section: "QuickCSS",
        id: "quick_css"
    },
    {
        section: "Updater", 
        id: "updater"
    }
];

if (RELEASE_STATE === "dev") DUMB_SECTIONS.push({
    section: "Dev",
    id: "dev"
});

export default function SkellySection({ settings, context }) {
    const { NumberBadge } = getViaProps("NumberBadge", "IconBadge");
    const { settingsTabBar, settingsTabBarItem } = getViaProps("settingsTabBar", "item");
    const { Text, TabBar } = megaModule;
    /*React.useEffect(() => {
        sectionCopy[4] = <Text className="SC_marginRight8" style={{ display: "flex" }}>
            Updater
            <NumberBadge className="SC_updatePing" count={20} />
        </Text>;
    });*/

    const [ currentTab, setTab ] = React.useState(DUMB_SECTIONS[0].id);
    let CurrentTab;

    switch (currentTab) {
        case "general":  
            CurrentTab = General;
            break;
        case "plugins": 
            CurrentTab = Plugins;
            break;
        case "themes": 
            CurrentTab = ThemesTab;
            break;
        case "quick_css":
            CurrentTab = QuickCSS;
            break;
        case "updater":
            CurrentTab = UpdaterTab;
            break;
        case "dev":
            CurrentTab = DevTab;
    }

    return <>
        <TabBar
            className={settingsTabBar}
            look="brand"
            type="top"
            selectedItem={currentTab}
            onItemSelect={v => setTab(
                DUMB_SECTIONS[
                    DUMB_SECTIONS.findIndex(val => v === val.id)
                ].id
            )}
        >
            {
                DUMB_SECTIONS.map(v => <TabBar.Item
                    className={settingsTabBarItem}
                    id={v.id}
                >
                    { v.section }
                </TabBar.Item>)
            }
        </TabBar>


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