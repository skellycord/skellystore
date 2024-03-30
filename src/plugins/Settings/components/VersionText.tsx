import { LAST_COMMIT, MOD_VERSION, RELEASE_STATE } from "@skellycord/utils/constants";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";

export default function VersionText() {
    const { Text } = megaModule;
    const { line } = getViaProps("line", "appArch");
     
    return <Text
        className={line}
        color="text-muted"
        variant="text-xs/normal"
    >
        Skellycord ({ MOD_VERSION }) ({ LAST_COMMIT !== null ? LAST_COMMIT.substring(0,7) : RELEASE_STATE })
    </Text>;
}