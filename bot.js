//---DO NOT DELETE---\\
const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config/config.json")
//---DO NOT DELETE--\\

//--Starting the bot
bot.on('ready', () => {
  console.log('Connected and ready for use');
});
//---Bot is started

//--New User Welcome
bot.on("guildMemberAdd", member =>{
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome ${member.user} to our discord server!`);
});

bot.on("guildCreate", guild =>{
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

//--Starting the bot command handler
bot.on('message', message =>{
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if(command === "help"){
    message.reply("Work in progres")
  }

  //--Kick Command
  if(command === "kick"){
    let modRole = message.guild.roles.find("name", config.superuserRole);
    if (!message.member.roles.has(modRole.id)){
      return message.reply("I'm sorry but you dont have the power to do this!")
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please menation a user (@USER_NAME) to kick");
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember){
      return message.reply("That does not seem like a valid user");
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
      message.reply("I seem to lack the powers to do this");
    }
    kickMember.kick().then(member =>{
      message.reply(`${member.user} has been kicked from the server`)
    }).catch(e =>{
        console.error(e);
    });
  }

  //--Purge command
  if(command === "purge"){
   let modRole = message.guild.roles.find("name", config.superuserRole);
   if (!message.member.roles.has(modRole.id)){
     return message.reply("I'm sorry but you dont have the power to do this!");
   }
   message.channel.bulkDelete(args.join(" "));
 }

  //---Announce Command
  if(command === "announce"){
    message.channel.sendMessage("@everyone " + args.join(" "));
  }

  //--Dice command
  if(command === "dice"){
    var droll = require('droll');
    var result = droll.roll('2d6');
    message.reply("You rolled two dice and got: " + result);
  }

  //---Baisc maths Commands
  //---The addition command
  if(command === "add"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);

    message.reply(`You asked me to add together  ` + args.join(" ") + `, the result was: ${total}`);
  }
  //---The subtraction command
  if(command === "subtract"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);

    message.reply(`You asked me to subtract  ` + args.join(" ") + `, the result was: ${total}`);
  }
  //---The multiplication command
  if(command == "multiply"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);

    message.reply(`You asked me to multiply  ` + args.join(" ") + `, the result was: ${total}`);
  }
  //---The division command
  if(command === "divide"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);

    message.reply(`You asked me to divide  ` + args.join(" ") + `, the result was: ${total}`);
  }

  //Coinflip
  if(command === "coinflip"){
    var Side = new Array()

    Side[0] = 'Heads';
    Side[1] = 'Tails';

    var S = Side.length;
    var whichSide = Math.round(Math.random()*(S-1));
    function showSide(){
      message.reply(Side[whichSide]);
    }
    showSide();
  }

  //Suggestions command
  if(command === "suggestion"){
    message.channel.sendMessage("", {embed: {
  color: 3447003,
  author: {
    name: bot.user.username,
    icon_url: bot.user.avatarURL
  },
  title: 'So you have a suggestion?',
  description: 'Feel free to submit a suggestion to my inbox!',
  fields: [
    {
      name: 'I have a suggestion for the bot!',
      value: 'Please send me an email with your suggestion, When sending the email please make sure to title it "[SUGGESTION]Your suggestion" so I can differentiate between suggestions and bug reports.'
    },
    {
      name: 'What should I send you?',
      value: 'Feel free to sumbit any suggestions that you have, Whilst not all will be added I will make an attempt for those that fall in line with the ideals of this bot and those I find awesome, All suggestions will be documented'
    },
    {
      name: 'Where should I send this?',
      value: 'vizualmail@gmail.com'
    }
  ],
  timestamp: new Date(),
  footer: {
  }
}});
  }
  //Bug report command
  if(command === "bug"){
    message.channel.sendMessage("", {embed: {
  color: 3447003,
  author: {
    name: bot.user.username,
    icon_url: bot.user.avatarURL
  },
  title: 'Short guide on how to sumbit a bug report.',
  description: 'This is a short guide on showing you how to submit a successful bug report.',
  fields: [
    {
      name: 'Help I found a bug!',
      value: 'Whilst I do attempt to ensure that my projects are bug free some bugs may slip through the cracks, If you have found a bug please send me an email with a bug report. If you could also title the bug report "[BUG]Title of bug" this allows me to differentiate between bug reports and suggestions. '
    },
    {
      name: 'What information do you need?',
      value: 'As much information as you can possibly give me about the bug, Things like what you were doing at the time and what actually happened. Screenshots are also handy if you know how to send them across.'
    },
    {
      name: 'Where should I send this?',
      value: 'vizualmail@gmail.com'
    }
  ],
  timestamp: new Date(),
  footer: {
  }
}});
  }

  
});
//--End of the bot command handler

//--Login to Discord
bot.login(config.token)
