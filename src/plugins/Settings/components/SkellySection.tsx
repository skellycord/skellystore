import { React, megaModule } from "@skellycord/webpack/common";
import General from "./tabs/General";
import Plugins from "./tabs/Plugins";
import QuickCSS from "./tabs/QuickCSS";
import ThemesTab from "./tabs/Themes";
import UpdaterTab from "./tabs/Updater";
import DevTab from "./tabs/Dev";
import { getViaProps } from "@skellycord/webpack";
import { RELEASE_STATE } from "@skellycord/utils/constants";

const DUMB_SECTIONS = [
    {
        section: "General",
        id: "general",
        element: General
    },
    {
        section: "Plugins",
        id: "plugins",
        element: Plugins
    },
    {
        section: "Themes",
        id: "themes",
        element: ThemesTab
    },
    {
        section: "QuickCSS",
        id: "quick_css",
        element: QuickCSS
    },
    {
        section: "Updater", 
        id: "updater",
        element: UpdaterTab
    }
];

if (RELEASE_STATE === "dev") DUMB_SECTIONS.push({
    section: "Dev",
    id: "dev",
    element: DevTab
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
    const CurrentTab = DUMB_SECTIONS[DUMB_SECTIONS.findIndex(val => currentTab === val.id)].element;

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