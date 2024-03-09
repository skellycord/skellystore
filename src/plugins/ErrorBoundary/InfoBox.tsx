import { React, megaModule } from "@skellycord/webpack/common";

export default function InfoBox({ error }: { error: Error }) {
    const {
        Card,
        Text
    } = megaModule;
    return <Card>
        <Text>Your discord client crashed.</Text>
        <Text>Message: <code>{ error.message }</code></Text>
        <Text>Stack: <code>{ error.stack }</code></Text>
    </Card>;
}