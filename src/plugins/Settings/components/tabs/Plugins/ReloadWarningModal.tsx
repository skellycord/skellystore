import joinClassNames from "@skellycord/utils/joinClassNames";
import { getViaProps } from "@skellycord/webpack";
import { React, css, megaModule } from "@skellycord/webpack/common";

export default function ReloadWarningModal({ modalProps }: { modalProps: any }) {
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
            <Text tag="h1" variant="heading-lg/semibold">Reload Discord?</Text>
            <ModalCloseButton 
                className={getViaProps("modalCloseButton").modalCloseButton}
                onClick={modalProps.onClose} 
            />
        </ModalHeader>

        <ModalContent>
            <Text>The plugin you have unloaded contained patches that can only be removed by reloading the client.</Text>
            <br />
            <Text>Would you like to reload discord now?</Text>
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
                Reload Later
            </Button>

            <Button onClick={() => location.reload()}>Reload</Button>
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