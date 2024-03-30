import { React, megaModule } from "@skellycord/webpack/common";
import reactErrorCodes from "./errorCodes";

const DECODER_URL_RE = /https?:\/\/reactjs\.org\/docs\/error-decoder\.html\?invariant=([0-9]+)(?:[^ ])+/;

export default function InfoBox({ error }: { error: Error }) {
    const {
        Card,
        Text
    } = megaModule;
    
    const isReactError = DECODER_URL_RE.test(error.message);
    
    if (isReactError) {
        let { message, stack } = error;
        if (reactErrorCodes[error.message]) error.message = reactErrorCodes[error.message];
        else {
            const errorMatch = error.message.match(/Minified React error #(\d*);/);
            if (errorMatch?.[1]) error.message = reactErrorCodes[errorMatch[1]];
        }
    }
    return <Card>
        <Text>Your discord client crashed.</Text>
        <Text>Message: <code>{ error.message }</code></Text>
        <Text>Stack: <code>{ error.stack }</code></Text>
    </Card>;
}