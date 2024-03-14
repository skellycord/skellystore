import { Plugin, SettingsModel, SettingsTypes, stores } from "@skellycord/apis/plugins";
import { settings } from "@skellycord/utils";
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

    let pluginSettings: settings;
    if (plugin.settings) pluginSettings = settings.openConfig(plugin.name);

    return <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
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
            { plugin.settings && plugin.settings?.length ? (plugin.settings as unknown as SettingsModel[]).map(s => {
                switch (s.type) {
                    case SettingsTypes.BOOLEAN: return <FormSwitch 
                        note={s.description}
                        value={pluginSettings.get(s.key, s.defaultValue)}
                    >
                        { s.displayName }
                    </FormSwitch>;
                }
            }) : <Text>No settings :(</Text>}
        </ModalContent>
    </ModalRoot>;
}