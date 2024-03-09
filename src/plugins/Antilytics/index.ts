import { Plugin } from "@skellycord/apis/plugins";

export const name = "Antilytics";
export const description = "Breaks discord's tracking.";

export async function start() {
    const owo = window.DiscordSentry.getCurrentHub();
    owo.getClient().close(0);
    owo.getScope().clear();

    window?.DiscordNative?.window?.setDevtoolsCallbacks(null, null);
    window.__SENTRY__.globalEventProcessors.splice(0, window.__SENTRY__.globalEventProcessors.length);
    window.__SENTRY__.logger.disable(); 
}