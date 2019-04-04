interface SlackReactionParams{
    ts: string;
    reaction: string;
    channel: string;
}
class SlackReactor{
    public reaction_params: SlackReactionParams;
    private slack_token: string;
    constructor(slack_token: string, params: SlackReactionParams){
        this.reaction_params = params;
        this.slack_token = slack_token;
    }

    public isTarget(): boolean{
        if (REACTION_EMOJIS.indexOf(this.reaction_params.reaction) >= 0) {
            return true;
        }

        return false;
    }

    public getReactionName(): string{
        return this.reaction_params.reaction;
    }

    public getMessage(){
        return SlackMessageItem.getMessageFromReaction(this.slack_token, this.reaction_params);
    }

    public replyReaction(reply_emoji: string){
        const url = "https://slack.com/api/reactions.add";
        const method = 'post';
      
        var payload = {
          'token'      : this.slack_token,
          'channel'    : this.reaction_params.channel,
          'timestamp'  : this.reaction_params.ts,
          'name'       : reply_emoji
        };
      
        UrlFetchApp.fetch(url, {
          'method' : method,
          'payload' : payload,
        });
    }
}
