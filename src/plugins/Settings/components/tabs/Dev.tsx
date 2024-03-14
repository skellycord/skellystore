import { joinClassNames } from "@skellycord/utils";
import { CORE_STORE_LINK } from "@skellycord/utils/constants";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";

export default function DevTab() {
    const FormWrapperIdk = getViaProps("Wrap", "Child", "Justify");
    const { codeRedemptionInput } = getViaProps("codeRedemptionInput", "confirmBlurb");
    const { TextInput, FormTitle, Button, ButtonSizes, ButtonColors, FormDivider } = megaModule;
    
    const [ inputVal, setInputVal ] = React.useState(CORE_STORE_LINK);

    return <>
        <FormTitle>Custom Core Plugin Store</FormTitle>
        <FormWrapperIdk
            basis="auto"
            grow={1}
            shrink={1}
        >
            <TextInput
                className={codeRedemptionInput}
                placeholder={CORE_STORE_LINK}
                onChange={v => console.log(v)}
            />
            <Button 
                color={ButtonColors.RED}
                onClick={() => {}}
            >Instate Store</Button>
        </FormWrapperIdk>
    </>;
}