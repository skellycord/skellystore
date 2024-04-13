import { MOD_STORAGE_KEY, TEMP_CORE_SETTINGS, TEMP_CORE_STORAGE_KEY, TempStoreRunType } from "@skellycord/utils/constants";
import joinClassNames from "@skellycord/utils/joinClassNames";
import { openStorage } from "@skellycord/utils/storage";
import { getViaProps } from "@skellycord/webpack";
import { React, css, megaModule } from "@skellycord/webpack/common";

export default function StoreChangeModal({ modalProps, newStore }: { modalProps: any, newStore: string }) {
    const {
        ModalRoot,
        ModalHeader,
        ModalContent,
        ModalCloseButton,
        ModalSize,
        ModalFooter,
        Text,
        Button,
        ButtonColors,
        ButtonLooks
    } = megaModule;

    const tempCore = openStorage(TEMP_CORE_STORAGE_KEY, TEMP_CORE_SETTINGS);

    return <ModalRoot {...modalProps} size={ModalSize.SMALL}>
        <ModalHeader
            separator={false}
            classNames={
                joinClassNames(
                    css.flexClasses.flex,
                    css.flexClasses.horizontal,
                    css.flexClasses.justifyStart,
                    css.flexClasses.alignCenter,
                    css.flexClasses.noWrap
                )
            }
        >
            <Text tag="h1" variant="heading-lg/semibold">Replace Core?</Text>
            <ModalCloseButton
                className={getViaProps("modalCloseButton").modalCloseButton}
                onClick={modalProps.onClose}
            />
        </ModalHeader>

        <ModalContent>
            { /* @ts-ignore */ }
            <Text variant="text-md/bold" style={{ color: css.colors.RED_300 }}>
                Do NOT instate any core you don't trust.<br />
                Running untrusted cores in place of the one skellycord provides may result in the theft, or misuse of your discord account.<br />
                Skellycord developers take no responsibility for anything that may happen while using a custom core.
            </Text>
            <br />
            <Text>How would you like to instate your store?</Text>
        </ModalContent>

        <ModalFooter className={
            joinClassNames(
                css.flexClasses.horizontal,
                css.flexClasses.noWrap,
                css.flexClasses.flex,
                css.flexClasses.justifyEnd
            )
        }>
            <Button
                onClick={modalProps.onClose}
                color={ButtonColors.TRANSPARENT}
                look={ButtonLooks.LINK}
            >
                Cancel
            </Button>

            <Button onClick={() => {
                tempCore.link = newStore;
                tempCore.loadType = TempStoreRunType.TEMPORARY;
                location.reload();
            }}>Temporarily</Button>

            <Button onClick={() => {
                tempCore.link = newStore;
                tempCore.loadType = TempStoreRunType.PERMANENT;
                location.reload();
            }}>Permanently</Button>
        </ModalFooter>
        { /* <ModalFooter>
            <Button
                color={ButtonColors.TRANSPARENT}
                onClick={() => {
                    modalProps.onClose();
                    modSettings.set("neverReloadWarn", true);
                }}
            >
                Don't show again
            </Button>

            <div style={{ float: "right" }}>
                <Button
                    onClick={modalProps.onClose}
                    color={ButtonColors.TRANSPARENT}
                    className="SC_marginRight8"
                >
                    Reload Later
                </Button>
                <Button
                    onClick={location.reload}
                >
                    Reload
                </Button>
            </div>
            
        </ModalFooter> */ }
    </ModalRoot>
}