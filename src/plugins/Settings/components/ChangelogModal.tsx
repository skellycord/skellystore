import { React, megaModule } from "@skellycord/webpack/common";

export default function ChangelogModal({ modalProps }) 
{
    const { 
        ModalRoot,
        ModalHeader,
        Text 
    } = megaModule;
    return <ModalRoot {...modalProps}>
        <ModalHeader separator={false}>
            <Text variant="header-lg/semibold">Skellycord V1 woo!!</Text>
        </ModalHeader>
        
    </ModalRoot>;
}