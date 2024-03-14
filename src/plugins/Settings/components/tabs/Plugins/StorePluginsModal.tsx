import { PluginStore, load, loaded, unload } from "@skellycord/apis/plugins";
import { getViaProps } from "@skellycord/webpack";
import { React, css, megaModule } from "@skellycord/webpack/common";
import joinClassNames from "@skellycord/utils/joinClassNames";
import PluginModal from "./PluginModal";
import { CORE_STORE, SETTINGS_KEY } from "@skellycord/utils/constants";
import { settings } from "@skellycord/utils";

export default function StorePluginsModal({ store, modalProps }: { store: PluginStore, modalProps: any }) {
    const {
        openModal,
        Card,
        Checkbox,
        ModalRoot,
        ModalHeader,
        ModalContent,
        ModalCloseButton,
        ModalSize,
        Text
    } = megaModule;

    const { SettingsIcon } = getViaProps("SettingsIcon");
    const skellycordSettings = settings.openConfig(SETTINGS_KEY, false);
    const storePlugins = skellycordSettings.get("stores", {})[store.name];

    return <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
        <ModalHeader separator={false}>
            <div style={{ display: "block" }}>
                <Text tag="h1" variant="heading-lg/semibold">{ store.name } ({ Object.keys(store.plugins).length })</Text>
                <Text tag="h5" variant="heading-sm/normal">by { store.author }</Text>
            </div>
            
            <ModalCloseButton 
                className={getViaProps("modalCloseButton").modalCloseButton}
                onClick={modalProps.onClose} 
            />
        </ModalHeader>

        <ModalContent>
            { 
                Object.values(store.plugins).map(d => {
                    const [ pluginLoaded, setPluginLoaded ] = React.useState(Boolean(loaded[d.name]));
                    return <Card key={d.name} className={joinClassNames("SC_pluginCard", css.margins.marginTop8)}>
                        <div className="section">
                            <Text className="sectionText">{ d.name }</Text>
                            <SettingsIcon onClick={() => openModal(props => <PluginModal modalProps={props} plugin={d} />)} className="SC_marginRight8" />
                            <Checkbox
                                type={Checkbox.Types.INVERTED}
                                value={pluginLoaded} 
                                disabled={store.name === CORE_STORE} 
                                onChange={(_, value) => {
                                    const lol = skellycordSettings.get("stores", {});
                                    lol[store.name] = storePlugins;

                                    storePlugins[d.name] = value;
                                    if (value) load(d);
                                    else unload(d.name);
                                    setPluginLoaded(value);
                                }}
                            />
                        </div>
                        <Text variant="text-sm/normal">{ d.description }</Text>
                    </Card>;
                })
            }
        </ModalContent>
    </ModalRoot>;
}