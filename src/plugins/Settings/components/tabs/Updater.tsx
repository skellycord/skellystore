import { LAST_COMMITS, getModCommits, modNeedsToUpdate } from "@skellycord/apis/updater";
import { LAST_COMMIT } from "@skellycord/utils/constants";
import { React, megaModule } from "@skellycord/webpack/common";

enum UpdateStatus {
    PENDING,
    FETCH_FAILED,
    UP_TO_DATE,
    NEED_TO_UPDATE
}

function findLastCommitIndex(commits: any[]) {
    return commits.findIndex(commit => commit.sha === LAST_COMMIT);
}

export default function() {
    const { Text } = megaModule;
    if (!LAST_COMMIT) return <Text>
        No Commit???
    </Text>;

    const [ commits, setCommits ] = React.useState([]);
    const [ updateStatus, setUpdateStatus ] = React.useState(UpdateStatus.PENDING);
    
    React.useEffect(() => {
        setUpdateStatus(modNeedsToUpdate(LAST_COMMITS) ? UpdateStatus.NEED_TO_UPDATE : UpdateStatus.UP_TO_DATE);
            
        setCommits(LAST_COMMITS);
    }, []);

    switch (updateStatus) {
        case UpdateStatus.PENDING:
            return <Text>Loading or something</Text>;
        case UpdateStatus.NEED_TO_UPDATE:
            let coolIndex: number;
            try {
                coolIndex = findLastCommitIndex(commits);
            }
            catch (e) {
                setUpdateStatus(UpdateStatus.FETCH_FAILED);
                break;
            }
            
            commits.reverse();
            return <Text>
                Out of Date!!! ({ commits.length - coolIndex }) commits behind!
        
                { commits.slice(commits.length - coolIndex).map(d => <Text onClick={()=>open(d.html_url, "_blank")}>
                    <code>{ d.sha.substring(0,7) }</code> - { d.commit.message.split("\n").shift() }
                </Text>) }
            </Text>;
        case UpdateStatus.UP_TO_DATE:
            return <Text>Up to date :D</Text>;
        case UpdateStatus.FETCH_FAILED:
            return <Text>Oh dear, couldn't fetch information</Text>;
    }
}