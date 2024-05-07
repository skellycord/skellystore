import { Plugin, SettingsModel, SettingsTypes, stores } from "@skellycord/apis/plugins";
import { openStorage, StorageObject } from "@skellycord/utils/storage";
import { MOD_SETTINGS, MOD_STORAGE_KEY } from "@skellycord/utils/constants";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";

export default function PluginModal({ plugin, modalProps }: { plugin: Plugin; modalProps: any }) {
    const { 
        ModalCloseButton,
        ModalRoot,
        ModalHeader,
        ModalContent,
        ModalSize,
        FormSwitch,
        Text
    } = megaModule;

    let pluginSettings: StorageObject<typeof MOD_SETTINGS>;
    if (plugin.settings) pluginSettings = openStorage(MOD_STORAGE_KEY);

    return <ModalRoot {...modalProps} size={ModalSize.LARGE}>
        <ModalHeader separator={false}>
            <Text tag="h1" variant="heading-lg/semibold">{ plugin.name }</Text>

            <ModalCloseButton 
                className={getViaProps("modalCloseButton").modalCloseButton}
                onClick={modalProps.onClose} 
            />
        </ModalHeader>

        <ModalContent>
            <Text>Desciption: { plugin.description }</Text>
            <Text>Author: { stores[plugin.from].author }</Text>
            <Text>Patches: { plugin.patches?.length ?? 0 }</Text>
            { plugin.settings ? <plugin.settings storage={openStorage(plugin.name)} /> : <Text>TODO: Replace with lonely wumpus</Text>}
        </ModalContent>
    </ModalRoot>;
}