import { Theme } from "@skellycord/apis/themes";
import { joinClassNames } from "@skellycord/utils";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule } from "@skellycord/webpack/common";
import { colors, flexClasses, margins } from "@skellycord/webpack/common/css";

enum ThemeStatus {
    PENDING,
    OK,
    FAIL
}
export default function ThemeStatusCard({ theme }: { theme: Theme }) {
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

            const ref = (theme.element as HTMLLinkElement).href;
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
                    <FormTitle className={margins.marginTop4}>{ (theme.element as HTMLLinkElement).href ?? theme.element.textContent }</FormTitle>
                </div>
            </FormWrapperIdk>
        </Card>
    </div>;
}