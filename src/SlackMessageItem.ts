interface SlackMessageParams{
    ts: string;
    text: string;
    user:string;
    channel:string;
}

interface SlackResponse{
    message_params: SlackMessageParams;
    reaction_params: SlackReactionParams;
}
class SlackMessageItem{
    private slackApp: any; 
    private slack_token: string;
    public message_params: SlackMessageParams
    private reaction_params: SlackReactionParams

    static getMessageFromReaction(slack_token: string, reaction_params: SlackReactionParams){
        var slackApp = SlackApp.create(slack_token);
 
        let res = slackApp.channelsHistory(reaction_params.channel, {
            channel: reaction_params.channel,
            latest: reaction_params.ts,
            inclusive: true,
            count: 1
        });
        let message = res.messages.shift();

        return new SlackMessageItem("", message);
    }

    constructor(slack_token: string, message_params: SlackMessageParams){
        this.slack_token = slack_token;
        this.message_params = message_params;
    }

    public getDate(): string{
            var _d = this.message_params.ts?new Date(<any>this.message_params.ts * 1000):new Date();
            
            var Y = _d.getFullYear();
            var m = ("0" + (_d.getMonth() + 1)).slice(-2);
            var d = ("0" + _d.getDate()).slice(-2);
            var H = ("0" + _d.getHours()).slice(-2);
            var i = ("0" + _d.getMinutes()).slice(-2);
            var s = ("0" + _d.getSeconds()).slice(-2);
          
            return Y + "/" + m + "/" + d;

    }

    public getTime(): string{
            var _d = this.message_params.ts?new Date(<any>this.message_params.ts * 1000):new Date();
            
            var Y = _d.getFullYear();
            var m = ("0" + (_d.getMonth() + 1)).slice(-2);
            var d = ("0" + _d.getDate()).slice(-2);
            var H = ("0" + _d.getHours()).slice(-2);
            var i = ("0" + _d.getMinutes()).slice(-2);
            var s = ("0" + _d.getSeconds()).slice(-2);
          
            return H + ":" + i + ":" + s;

    }
}