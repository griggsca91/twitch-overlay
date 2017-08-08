
/*
@badges=;color=;display-name=Theycallmeblank;emotes=;id=8d6a6a14-2032-462b-ba01-c25d5350bc4a;mod=0;room-id=129613652;subscriber=0;tmi-sent-ts=1501869682575;turbo=0;user-id=82489119;user-type= :theycallmeblank!theycallmeblank@theycallmeblank.tmi.twitch.tv PRIVMSG #jumpystick :KATA R U CHEATING

*/


export function parseChatMessage(msg) {

    if (msg.search(".*PRIVMSG.*:.*") === -1) {
        return null 
    }

    let matches = msg.match(/.*@(.*)\.tmi\.twitch\.tv PRIVMSG #\S* :(.*)/);
    
    if (matches.length != 3) {
        return null 
    }    


    
    return { userName: matches[1],
        message: matches[2]}; 
}