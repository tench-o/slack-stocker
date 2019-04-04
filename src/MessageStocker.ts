class MessageStocker{
    private spreadsheet: any;
    private sheet: any;
    private lastrow: number;

    constructor(sheet_key: string, sheet_name: string){
        this.spreadsheet = SpreadsheetApp.openById(sheet_key);
        this.sheet = this.spreadsheet.getSheetByName(sheet_name);
        this.lastrow = this.sheet.getLastRow();
    }

    public addReactionMessage(reaction: SlackReactor, message: SlackMessageItem){
        let add_vote = this.addReactionVote(message.message_params.ts, reaction.reaction_params.reaction);
        if (add_vote){
            return;
        }

        this.sheet.getRange(this.lastrow + 1, 1).setValue(reaction.reaction_params.reaction);
        this.sheet.getRange(this.lastrow + 1, 2).setValue(message.getDate);
        this.sheet.getRange(this.lastrow + 1, 3).setValue(message.getTime);
        this.sheet.getRange(this.lastrow + 1, 4).setValue(message.message_params.text);
        this.sheet.getRange(this.lastrow + 1, 6).setValue(1);
        this.sheet.getRange(this.lastrow + 1, 7).setValue(message.message_params.ts);
        this.sheet.getRange(this.lastrow + 1, 8).setValue(message.message_params.text);
    }

    private addReactionVote(ts: string, emoji: string){
        var sheet = this.spreadsheet.getSheetByName('認定');
        var lastrow = sheet.getLastRow(); //最終行
          
        let start_row = lastrow;
        if(lastrow > 30){
          start_row = start_row - 30;
        }
        
        var sheetdata = sheet.getSheetValues(start_row, 1, lastrow, 7);
        
        let exists = false;
        for (var i = 0; i < sheetdata.length; i++) {
            sheet.getRange(lastrow + 2, 7).setValue(sheetdata[i]);
      
          if (sheetdata[i][5] == ts && sheetdata[i][0] == emoji){
            var count = sheetdata[i][5] + 1;
            sheet.getRange(start_row + i, 6).setValue(count);
            exists = true;
          }
        }

        return exists;
 
    }
}