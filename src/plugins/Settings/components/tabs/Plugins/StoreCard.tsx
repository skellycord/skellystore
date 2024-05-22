import { PluginStore } from "@skellycord/apis/plugins";
import { getViaProps } from "@skellycord/webpack";
import { React, css, megaModule } from "@skellycord/webpack/common";
import Paw from "../../Paw";
import { joinClassNames } from "@skellycord/utils";
import PluginModal from "./StorePluginsModal";
import { CORE_STORE } from "@skellycord/utils/constants";
import { User } from "discord-types/general";
import { colors, variables } from "@skellycord/webpack/common/css";

export default function StoreCard({ store, isNew }: { store: PluginStore, isNew: boolean }) {
    const [ author, setAuthor ] = React.useState<User>();

    React.useEffect(() => {
        async function fetchUser() {
            const { getUser } = getViaProps("getUser", "fetchProfile");
            const pluginAuthor = await getUser(store.author);

            setAuthor(pluginAuthor);
        }

        fetchUser();
    }, []);

    const { 
        Text, 
        Card,
        CardTypes,
        Button, 
        Tooltip,
        Clickable,
        Modal,
        Avatar,
        openModal,
        FormDivider,
        AnimatedDots
    } = megaModule;

    // const { TEXT_NORMAL } = getViaProps("TEXT_NORMAL", "TOAST_BGS")
    const { clickable, iconWrapper } = getViaProps("clickable", "iconWrapper");
    const { getUserAvatarURL } = getViaProps("getUserAvatarURL");
    const { openUserProfileModal } = getViaProps("openUserProfileModal", "closeUserProfileModal");
    const { TextBadge } = getViaProps("TextBadge", "NumberBadge");
    const { EyeIcon } = getViaProps("EyeIcon");
    const { TrashIcon } = getViaProps("TrashIcon");

    return <Card editable className={joinClassNames(css.margins.marginBottom8, "SC_pluginCard")} type={CardTypes.PRIMARY}>
            <div className="buttons">
                <Tooltip text="View Plugins">
                    {
                        (tooltipAttr) => <Clickable
                            { ...tooltipAttr }
                            className={joinClassNames("SC_marginRight8", clickable, iconWrapper)}
                            onClick={() => openModal(props => <PluginModal modalProps={props} store={store}/>)}
                        >
                            <EyeIcon />
                        </Clickable>
                    }
                </Tooltip>

                { store.name !== CORE_STORE ? 
                <Tooltip text="Remove Store">
                    {
                        (tooltipAttr) => <Clickable
                            { ...tooltipAttr }
                            className={joinClassNames(clickable, iconWrapper)}
                        >
                        <TrashIcon />
                    </Clickable>
                    }
                </Tooltip> : null }
            </div>
            
            <div className="storeName">
                <Text 
                    variant="text-lg/semibold" 
                    className={joinClassNames(css.margins.marginBottom4, "SC_marginRight8")}
                >
                    { store.name }
                </Text>
                { store.name === CORE_STORE ? 
                    <TextBadge
                        className="SC_marginRight8"
                        color={colors.BRAND_500}
                        text="Core"
                    />
                : null }
                { isNew ? <TextBadge 
                    className="SC_marginRight8"
                    color={colors.BRAND_500}
                    text="New"
                /> : null }
            </div>
            
            { author ? <div 
                style={{ 
                    display: "flex"
                }}>
                <Avatar
                    className="SC_marginRight8"
                    size="SIZE_20"
                    src={getUserAvatarURL(author)}
                />
                        
                <Text 
                    variant="text-sm/normal" 
                    style={{ cursor: "pointer" }}
                    onClick={() => openUserProfileModal({ userId: author.id })}
                >
                    { author.username }
                </Text>
            </div> : null }
            
        </Card>;
}

/* <div 
        style={{ display: "flex" }}
        onClick={() => openUserProfileModal({ userId: this.state.author.id })}
    >
        <Avatar
            className="SC_marginRight8"
            size="SIZE_20"
            src={`https://cdn.discordapp.com/avatars/${this.state.author.id}/${this.state.author.avatar}.webp?size=80`}
        />
                
        <Text>{ this.state.author.username }</Text>
</div>*/