const SLACK_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
const SLACK_BOT_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_ACCESS_TOKEN');
const REACTION_EMOJIS = PropertiesService.getScriptProperties().getProperty('REACTION_EMOJIS').split(",");
const GOOGLE_SPREADSHEET_KEY = PropertiesService.getScriptProperties().getProperty('GOOGLE_SPREADSHEET_KEY');

function doPost(e: any){
   let token = SLACK_ACCESS_TOKEN;
   // event parametersの取得
   let params = JSON.parse(e.postData.getDataAsString()).event;
 
   if (params.type === "reaction_added") {
       let reactor = new SlackReactor(token, params.item)
       if (!reactor.isTarget()) {
           return ContentService.createTextOutput(params.challenge);
       }

       let message = reactor.getMessage();
       let stocker = new MessageStocker(GOOGLE_SPREADSHEET_KEY, '認定')
       stocker.addReactionMessage(reactor, message);
   }
 
   // Slackバリデーション用
   return ContentService.createTextOutput(params.challenge);
 }
 function doGet(e){
   // Slackバリデーション用
   return ContentService.createTextOutput('good');
 }
 