const Discord = require('discord.js');
var bot = new Discord.Client();

const PREFIX = "!";


bot.on("ready", function() {
    bot.user.setGame('!pomoc')
    console.log("Im Ready!");
});



bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;
        var args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "grupa":
                message.channel.send("<http://grupa.rl-polska.pl>");
                break;
            case "pomoc":
                message.channel.send("***Aktualnie dostępne komendy:***\n\n__**Ogólne:**__\n**!administracja**\n**!grupa**\n\n__**Przydzielające Rolę:**__\n**!pc**\n**!ps4**\n**!xbox**\n**!news**");
                break;
            case "fanpage":
                message.channel.send("<https://www.facebook.com/RLPolska/>");
                message.react("✅");
                break;
            case "pc":
            var role = message.member.guild.roles.find('name', 'PC');
                message.author.send("Przypisano rolę **PC**");
                message.member.addRole(role)
                break;
            case "ps4":
            var role2 = message.member.guild.roles.find('name', 'PS4');
                message.author.send("Przypisano rolę **PS4**");
                message.member.addRole(role2)
                break;
            case "xbox":
            var role3 = message.member.guild.roles.find('name', 'XBOX');
                message.author.send("Przypisano rolę **XBOX**");
                message.member.addRole(role3)
                break;     
            case "news":
            var role_news = message.member.guild.roles.find('name', 'News');
                message.author.send("Przypisano rolę **NEWS**");
                message.member.addRole(role_news)
                break;

        }
    }  
)







bot.login(process.env.BOT_TOKEN);
