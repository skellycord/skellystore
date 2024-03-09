import { PluginStore } from "@skellycord/apis/plugins";
import { getViaProps } from "@skellycord/webpack";
import { React, css, megaModule } from "@skellycord/webpack/common";
import Paw from "../../Paw";
import { joinClassNames } from "@skellycord/utils";
import PluginModal from "./StorePluginsModal";
import { CORE_STORE } from "@skellycord/utils/constants";
import { User } from "discord-types/general";
import { UserStore } from "@skellycord/webpack/common/stores";

export default function StoreCard({ store }: { store: PluginStore }) {
    const [ pluginsHidden, setHidden ] = React.useState(true);
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
        Button, 
        Tooltip,
        Modal,
        Avatar,
        openModal
    } = megaModule;

    const { cardPrimary } = getViaProps("cardPrimary");
    const { getUserAvatarURL } = getViaProps("getUserAvatarURL");
    const { openUserProfileModal } = getViaProps("openUserProfileModal", "closeUserProfileModal");
    const { connectedAccountVerifiedIcon } = getViaProps("connectedAccountVerifiedIcon");
    const { flowerStarContainer } = getViaProps("flowerStarContainer");
    const formStyles = getViaProps("formNoticeTitle");
    const { previewHeader } = getViaProps("previewHeader");

    return <Card className={joinClassNames(css.margins.marginBottom8, "SC_pluginCard")} type={cardPrimary}>
            <Button 
                style={{ float: "right" }}
                onClick={() => openModal(props => <PluginModal modalProps={props} store={store}/>)}
            >
                Show Plugins
            </Button>
            <Text 
                variant="text-lg/semibold" 
                className={css.margins.marginBottom4}
            >
                { store.name } { store.name === CORE_STORE ? <Paw /> : null }
            </Text>
            
            { author ? <div 
                style={{ display: "flex" }}
                onClick={() => openUserProfileModal({ userId: author.id })}
            >
                <Avatar
                    className="SC_marginRight8"
                    size="SIZE_20"
                    src={getUserAvatarURL(author)}
                />
                        
                <Text variant="text-sm/normal">{ author.username }</Text>
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