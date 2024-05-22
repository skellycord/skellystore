import { themes } from "@skellycord/apis";
import { Theme } from "@skellycord/apis/themes";
import { joinClassNames } from "@skellycord/utils";
import { MOD_STORAGE_KEY } from "@skellycord/utils/constants";
import { openStorage } from "@skellycord/utils/storage";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";
import { colors, flexClasses, margins } from "@skellycord/webpack/common/css";

enum ThemeStatus {
    PENDING,
    OK,
    FAIL
}
export default function ThemeStatusCard({ theme, themeIndex }: { theme: Theme, themeIndex: number }) {
    const { 
        Card, 
        Text,
        Dots,
        FormTitle
    } = megaModule;
    const FormWrapperIdk = getViaProps("Wrap", "Child", "Justify");
    const { CircleCheckIcon } = getViaProps("CircleCheckIcon");
    const { CircleExclamationPointIcon } = getViaProps("CircleExclamationPointIcon");
    const { formNotice } = getViaProps("formNotice", "formNoticeBody")

    const [ themeLoaded, setThemeLoaded ] = React.useState(ThemeStatus.PENDING);
    
    React.useEffect(() => {
        async function detectThemeLoad() {
            if (theme.local) { return; } // todo: local theme logic

            const ref = findHref(theme, themeIndex);
            if (ref.includes("discord.com/")) return setThemeLoaded(ThemeStatus.FAIL);
            const req = await fetch(ref);

            setThemeLoaded(req.ok ? ThemeStatus.OK : ThemeStatus.FAIL);
        }

        detectThemeLoad();
    });

    let Status;
    let StatusProps;
    switch (themeLoaded) {
        case ThemeStatus.PENDING:
            Status = Dots;
            break;
        case ThemeStatus.FAIL:
            Status = CircleExclamationPointIcon;
            StatusProps = {
                fill: "currentColor",
                // @ts-ignore
                color: colors.RED_300
            };
            break;
        case ThemeStatus.OK:
            Status = CircleCheckIcon;
            StatusProps = {
                fill: "currentColor",
                // @ts-ignore
                color: colors.GREEN_300
            };

    }
    return <div style={{ textWrap: "wrap" }}>
        <Card className={joinClassNames(formNotice, flexClasses.flex, margins.marginBottom8)}>
            <FormWrapperIdk>
                <div className="SC_marginRight8">
                    <Status { ...StatusProps} />
                </div>
                <div>
                    <FormTitle className={margins.marginTop4}>{ findHref(theme, themeIndex) }</FormTitle>
                </div>
            </FormWrapperIdk>
        </Card>
    </div>;
}

function findHref(theme: Theme, i: number) {
    return theme?.element?.href ?? openStorage(MOD_STORAGE_KEY).webThemes.split("\n")[i];
}