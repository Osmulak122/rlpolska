const Discord = require('discord.js');
var bot = new Discord.Client();

const PREFIX = "!";


bot.on("ready", function() {
    bot.user.setGame('grupa.rl-polska.pl')
    console.log("Im Ready!");
});

bot.on('messageReactionAdd', (reaction, user) => {
    var Welcome = client.channels.find("name", "welcome");
    var Emoji = "✅";
    if (!reaction.channel == Welcome) return;
    if (!reaction.emoji.name == Emoji) return;

    //Your code here
});
            
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;
        var args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "grupa":
                message.channel.send("<http://grupa.rl-polska.pl");
                break;
            case "pomoc":
                message.channel.send("***Aktualnie dostępne komendy:***\n\n**!grupa**\n**!administracja**");
                break;
            case "fanpage":
                message.channel.send("<https://www.facebook.com/RLPolska/>");
        }
    }  
)




bot.login(process.env.BOT_TOKEN);
