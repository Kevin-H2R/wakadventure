import {WakaTimeClient} from "wakatime-client"

export class WakaClient {
    private static instance: WakaClient;
    private client: WakaTimeClient;

    private constructor() {
        this.client = new WakaTimeClient(process.env.API_KEY)
    }

    public static getInstance(): WakaClient {
        if (!WakaClient.instance) {
            WakaClient.instance = new WakaClient()
        }
        return WakaClient.instance
    }

    public getClient() {
        return this.client
    }
}