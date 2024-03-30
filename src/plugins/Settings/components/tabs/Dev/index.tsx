import { INTERNAL_PLUGIN } from "@skellycord/apis/plugins";
import { joinClassNames } from "@skellycord/utils";
import { CORE_STORE_LINK } from "@skellycord/utils/constants";
import { getViaProps, getViaSource } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";
import { margins } from "@skellycord/webpack/common/css";

export default function DevTab() {
    const FormWrapperIdk = getViaProps("Wrap", "Child", "Justify");
    const { codeRedemptionInput } = getViaProps("codeRedemptionInput", "confirmBlurb");
    const { TextInput, FormTitle, Button, ButtonSizes, ButtonColors, FormDivider, Text } = megaModule;
    
    const [ storeInputVal, setStoreInputVal ] = React.useState(CORE_STORE_LINK);
    const [ sourceInputVal, setSouceInputVal ] = React.useState("");
    const [ sourceError, setSourceError ] = React.useState<String>();
    let source;
    try {
        source = getViaSource(new RegExp(sourceInputVal));
    }
    catch (e) {
        setSourceError(e.message);
    }
    
    return <>
        <FormTitle>Custom Core Plugin Store</FormTitle>
        <FormWrapperIdk>
            <TextInput
                className={codeRedemptionInput}
                placeholder={INTERNAL_PLUGIN}
                value={INTERNAL_PLUGIN !== CORE_STORE_LINK ? INTERNAL_PLUGIN : ""}
                onChange={v => setStoreInputVal(v)}
            />
            <Button 
                color={ButtonColors.RED}
                onClick={() => {}}
            >Instate Store</Button>
        </FormWrapperIdk>
        <FormDivider className={joinClassNames(margins.marginBottom20, margins.marginTop20)}/>
        <FormTitle>Source Finder</FormTitle>
        <TextInput
            size={TextInput.Sizes.DEFAULT}
            value={sourceInputVal}
            error={sourceError}
            onChange={v => setSouceInputVal(v)}
        />

        <Text>{ 
            !sourceError ?
            typeof source === "object" ? JSON.stringify(source, null, "\n") : String(source) :
            ""
        }</Text>
    </>;
}