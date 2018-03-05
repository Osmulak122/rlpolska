const Discord = require('discord.js');
var bot = new Discord.Client();

const PREFIX = "!";

var pc = member.guild.roles.find("name", "PC");

bot.on("ready", function() {
    bot.user.setGame('grupa.rl-polska.pl')
    console.log("Im Ready!");
});


bot.on("message", function(message, member) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;
        var args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "grupa":
                message.channel.send("<http://grupa.rl-polska.pl>");
                break;
            case "pomoc":
                message.channel.send("***Aktualnie dostępne komendy:***\n\n**!grupa**\n**!fanpage**");
                break;
            case "fanpage":
                message.channel.send("<https://www.facebook.com/RLPolska/>");
                break;
            case "PC":
                message.author("przydzielono range **PC**");
                member.addRole(pc);
                break;
                
        }
    }  
)








bot.login(process.env.BOT_TOKEN);
