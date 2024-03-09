import { fetchStore, stores } from "@skellycord/apis/plugins";
import { joinClassNames } from "@skellycord/utils";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule, css } from "@skellycord/webpack/common";
import StoreCard from "./StoreCard";

export default function PluginsTab() {
    const [ inputVal, setInputVal ] = React.useState("");
    const [ storeLength, setStoreLength ] = React.useState(Object.keys(stores).length);
    const [ newStoreAdded, setStoreAdded ] = React.useState(false);
    
    const { TextInput, Text, FormDivider } = megaModule;
    const { inputDefault } = getViaProps("inputDefault", "editable", "error", "focused");

    return <>
        <TextInput 
            placeholder={"Add Plugin Store"}
            value={inputVal}
            size={inputDefault}
            type="text"
            autoFocus={false}
            className={css.margins.marginBottom20}
            onChange={v => setInputVal(v)}
            onKeyDown={async ({ target: { value }, key }) => {
                if (key !== "enter" && key !== "Enter") return;
                try {
                    await fetchStore(value);
                    setStoreLength(Object.keys(stores).length);
                }
                catch (e) {
                    console.error(e);
                }
            }}
        />

        <Text className={joinClassNames(css.fontVariants.h2, css.margins.marginBottom4)}>Stores ({ storeLength })</Text>
        <FormDivider className={css.margins.marginBottom20} />
        { Object.values(stores).map(s => <StoreCard store={s} key={s.name} />) }
    </>;
} 