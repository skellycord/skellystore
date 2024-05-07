import { INTERNAL_PLUGIN } from "@skellycord/apis/plugins";
import { joinClassNames, storage } from "@skellycord/utils";
import { CORE_STORE_LINK, TEMP_CORE_SETTINGS, TEMP_CORE_STORAGE_KEY } from "@skellycord/utils/constants";
import { getViaProps, getViaSource } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";
import { margins } from "@skellycord/webpack/common/css";
import StoreChangeModal from "./StoreChangeModal";
import { openStorage } from "@skellycord/utils/storage";

export default function DevTab() {
    const tempCore = openStorage(TEMP_CORE_STORAGE_KEY, TEMP_CORE_SETTINGS);
    const FormWrapperIdk = getViaProps("Wrap", "Child", "Justify");
    const { codeRedemptionInput } = getViaProps("codeRedemptionInput", "confirmBlurb");
    const { TextInput, FormTitle, Button, ButtonSizes, ButtonColors, FormDivider, Text, openModal } = megaModule;
    
    const [ storeInputVal, setStoreInputVal ] = React.useState(INTERNAL_PLUGIN !== CORE_STORE_LINK ? INTERNAL_PLUGIN : "");
    const [ sourceInputVal, setSourceInputVal ] = React.useState("");
    const [ sourceError, setSourceError ] = React.useState<String>();
    let source;
    try {
        source = getViaSource(new RegExp(sourceInputVal));
        if (sourceError) setSourceError(null);
    }
    catch (e) {
        if (!sourceError) setSourceError(e.message);
    }
    
    return <>
        <FormTitle>Custom Core Plugin Store</FormTitle>
        <FormWrapperIdk>
            <TextInput
                className={codeRedemptionInput}
                placeholder={INTERNAL_PLUGIN}
                value={storeInputVal}
                onChange={v => setStoreInputVal(v)}
            />

            <Button 
                color={ButtonColors.RED}
                disabled={
                    storeInputVal === "" && tempCore.link === ""
                    ||
                    storeInputVal !== "" && tempCore.link === storeInputVal
                }
                onClick={() => {
                    if (storeInputVal !== "") openModal(props => <StoreChangeModal modalProps={props} newStore={storeInputVal} />);
                    else {
                        tempCore.link = "";
                        location.reload();
                    }
                }}
            >Instate Store</Button>
        </FormWrapperIdk>
        <FormDivider className={joinClassNames(margins.marginBottom20, margins.marginTop20)}/>
        <FormTitle>Source Finder</FormTitle>
        <TextInput
            size={TextInput.Sizes.DEFAULT}
            value={sourceInputVal}
            error={sourceError}
            onChange={v => setSourceInputVal(v)}
        />

        <Text>Type: {typeof source} <br/> { 
            !sourceError ?
            (typeof source === "object" ? JSON.stringify(source, null, "\n") : String(source)) :
            ""
        }</Text>

        <Button onClick={()=>console.log("Source finder: ", source)}>Print in console</Button>
    </>;
}