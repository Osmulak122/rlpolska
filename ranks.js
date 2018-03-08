var rls = require('rls-api');

var rlsClient = new rls.Client({
    token: "X8ELHWIWBNDP0HAGVDA27PAZUBAAN94Y"
});

var rank = ["U","BI", "BII", "BII",
            "SI", "SII", "SIII",
            "SI", "SII", "SIII",
            "PI", "PII", "PIII",
            "DI", "DII", "DIII",
            "CI", "CII", "CIII",
            "GC"];


module.exports = {
func1: function getPlayerRank(nick, platforma)
{
    console.log("w funkcji: " + nick);
    var retVal;
    rlsClient.getPlayer(nick, rls.platforms.STEAM, function(status, data)
    {
        if(status === 200){
            
            retVal = rank[data.rankedSeasons[7][13].tier];
            message.author.send("Twoja ranga na trojkach: " + retVal);
            return retVal;

        }
        else{
            console.log("sie nie udalo sie");
            return retVal = "sie nie udalo sie";
        }
    });
}
}