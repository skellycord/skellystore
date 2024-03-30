import { Plugin } from "@skellycord/apis/plugins";
import { after } from "@skellycord/utils/patcher";
import { lazy } from "@skellycord/webpack";
import quotes from "./quotes.json";
import { React } from "@skellycord/webpack/common";
import InfoBox from "./InfoBox";

export const name = "SkellyBoundary";
export const description = "ErrorBoundary tweak that shows error.";
export const patches = [];
export async function start() {
    const ErrorBoundary = await lazy.getViaPrototypes("triggerSoftCrash", "_handleSubmitReport");

    after(ErrorBoundary.prototype, "render", (_, res, ts) => {
        if (!ts.state.error) return res;

        res.props.title = quotes[Math.floor(Math.random() * quotes.length)];
        res.props.note.props.children = React.createElement(InfoBox, { error: ts.state.error });
        return res;
    });
}