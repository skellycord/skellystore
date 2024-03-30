import { fetchStore, stores } from "@skellycord/apis/plugins";
import { joinClassNames } from "@skellycord/utils";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule, css } from "@skellycord/webpack/common";
import StoreCard from "./StoreCard";
import { plugins } from "@skellycord/apis";
import ReloadWarningModal from "./ReloadWarningModal";

export default function PluginsTab() {
    const [ currentStore ] = React.useState(Object.keys(plugins.loaded));
    const [ inputVal, setInputVal ] = React.useState("");
    const [ storeLength, setStoreLength ] = React.useState(Object.keys(stores).length);
    const [ storeBeingAdded, setStoreAdding ] = React.useState(false);

    async function runStore(val: string) {
        setStoreAdding(true);
        try {
            await fetchStore(val);
            setStoreLength(Object.keys(stores).length);    
        }
        catch (e) {
            console.error(e);
        }

        setInputVal("");
        setStoreAdding(false);
    }

    
    const { openModal, Button, TextInput, Text, FormDivider, FormTitle, AnimatedDots } = megaModule;
    const { inputDefault } = getViaProps("inputDefault", "editable", "error", "focused");
    const { codeRedemptionInput } = getViaProps("codeRedemptionInput", "confirmBlurb");
    const FormWrapperIdk = getViaProps("Wrap", "Child", "Justify");

    return <>
        <FormWrapperIdk>
            <TextInput 
                value={inputVal}
                size={inputDefault}
                disabled={storeBeingAdded}
                type="text"
                autoFocus={false}
                className={joinClassNames(css.margins.marginBottom20, codeRedemptionInput)}
                onChange={v => setInputVal(v)}
                onKeyDown={({ key }) => {
                    if (key !== "enter" && key !== "Enter") return;
                    runStore(inputVal);
                }}
            />
            <Button
                onClick={() => runStore(inputVal)}
            >
                { storeBeingAdded ? <AnimatedDots /> : "Add store" }
            </Button>
        </FormWrapperIdk>
        
        <FormTitle>Stores ({ storeLength })</FormTitle>
        <FormDivider className={css.margins.marginBottom20} />
        { Object.values(stores).map(s => <StoreCard isNew={currentStore.includes(s.name)} store={s} key={s.name} />) }
    </>;
}