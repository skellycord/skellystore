import { joinClassNames } from "@skellycord/utils";
import { getViaProps } from "@skellycord/webpack";
import { React, megaModule, css } from "@skellycord/webpack/common";
import ChangelogModal from "../ChangelogModal";
import { GUILD_DATA } from "@skellycord/utils/constants";
import { margins } from "@skellycord/webpack/common/css";
import { GuildStore } from "@skellycord/webpack/common/stores";


export default function GeneralTab({ context }) {
    const { 
        Text,
        Button,
        Card,
        Tooltip,
        ButtonColors,
        ButtonSizes
    } = megaModule;
    const { emptyState, emptyStateHeader, emptyStateSubtext } = getViaProps("skuCard", "promotionIcon");
    const { buttonContainer } = getViaProps("buttonContainer", "reminderTooltip", "tooltipContent");
    const { INVITE_BROWSER: { handler: openInviteWindow } } = getViaProps("INVITE_BROWSER");

    return <>
        <Card className={joinClassNames(margins.marginBottom20, emptyState)}>
            <Text className={joinClassNames(margins.marginTop8, emptyStateHeader)}>Skellycord</Text>
            <Text className={joinClassNames(emptyStateSubtext, margins.marginBottom20)}>"10/10 mod" - not a damn soul</Text>

            <div className={joinClassNames(buttonContainer, margins.marginBottom4)}>
                <Button
                    size={ButtonSizes.SMALL}
                    onClick={() => {
                        if (window?.DiscordNative) window?.DiscordNative?.app?.relaunch?.();
                        else location.reload();
                    }}
                    className={margins.marginBottom8}
                >
                    Restart Discord
                </Button>
                {
                    GuildStore.getGuild(GUILD_DATA.id) ? 
                        <Tooltip text="You're already in it lol">
                            {
                                (tooltipAttr) => <Button
                                    { ...tooltipAttr }
                                    size={ButtonSizes.SMALL}
                                    disabled={true}
                                >
                        Join Skellycord Server
                                </Button>
                            }
                        </Tooltip>
                        :
                        <Button
                            size={ButtonSizes.SMALL}
                            onClick={() => {
                                context.handleClose();
                                openInviteWindow({ args: { code: GUILD_DATA.invite } });
                            }}
                        >
                        Join Skellycord Server
                        </Button>
                }
                
                <Button
                    size={ButtonSizes.SMALL}
                    onClick={() => {
                        const vineboom = new Audio("https://archive.org/download/vine-boom-sound-effect-longer-verison-for-real/Vine%20Boom%20Sound%20Effect%20%28Longer%20Verison%20For%20Real%29.mp3");
                        vineboom.play();
                    }}
                >
                        Play Vineboom.mp3
                </Button>
                <Button 
                    size={ButtonSizes.SMALL}
                    onClick={() => open("https://github.com/skullbite/skellycord", "_blank")}
                    color={ButtonColors.GREEN} 
                    className={margins.marginBottom8}
                >
                        Source Code
                </Button>
            </div>
        </Card>

        { /*<FormSwitch
                note="LMAOOOOOOOOOOOO"
            >
                    This is a bad test, disregard it
            </FormSwitch>
            <FormSwitch
                note="LOLL"
            >
                    This is also part of the test
            </FormSwitch>*/ }
    </>;
}