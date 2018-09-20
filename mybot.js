const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!ping")) {
    message.channel.send("pong!");
  }
  if (message.content.startsWith("!roblox")) {
    message.channel.send("Roblox is fucking shite!");
  }
  if (message.content.startsWith("!marco")) {
    message.channel.send("Polo!");
  }
  if (message.content.startsWith("!steo")) {
    message.channel.send("The Great Globox!");
  }
  if (message.content.startsWith("!jonster")) {
    message.channel.send("Eye iz de bestest!");
  }
  if (message.content.startsWith("!boom boom boom")) {
      message.channel.send("Let me hear you say Frisco!");
 }
if (message.content.startsWith("!globox"))
{
  message.channel.send("Globox is great!", {files: ["https://image.ibb.co/gtkDNK/Globox.png"]});
}
if (message.content.startsWith("!rayman"))
{
  message.channel.send("Rayman is awesome!", {files: ["https://image.ibb.co/hptKUz/Rayman_Avatar.png"]});
}
});




// Config file with our credentials in it
var config = require('./config');

// Instance of Discord Js that we will be interacting with
var bot = new Discord.Client();

// Require Wolfram and set your app ID via the config file
var WolframLib = require('node-wolfram');
var Wolfram = new WolframLib(config.wolfram.APP_ID);

// Different result types that wolfram will give back
var resultOpts = ["Result", "Exact result", "Decimal approximation"];

// Called when the bot first runs
client.on("ready", function() {
	console.log("Bot started. Listening on " + bot.channels.length + " channels");
	console.log("-----");
});

// Checks each message for a command
client.on("message", function(message){
		if (message.content === "!help") {
			message.channel.send(
				"Things I can do:" +
				"\n\n`!help` - Show's what I can do" +
				"\n`!question <your question>` - Ask and you shall recieve" +
				"\n`!roll` - Roll a number between 1-100" +
				"\n`!flip` - Flip a coin" +
				"\n`!8ball` - Ask the magic 8ball a question");
		}

    if (message.content === "!roll") {
  		var result = Math.floor((Math.random() * 100) + 1);
  		message.channel.send("You rolled a: " + result);
    }

    if (message.content === "!flip") {
    	var result = Math.floor((Math.random() * 2) + 1);
    	if (result == 1) {
    		message.channel.send("The coin landed on heads");
    	} else if (result == 2) {
    		message.channel.send("The coin landed on tails");
    	}
    }

    if (message.content.startsWith("!8ball")) {if (message.content.endsWith("?")) {
    	var sayings = ["It is certain",
										"It is decidedly so",
										"Without a doubt",
										"Yes, definitely",
										"You may rely on it",
										"As I see it, yes",
										"Most likely",
										"Outlook good",
										"Yes",
										"Signs point to yes",
										"Reply hazy try again",
										"Ask again later",
										"Better not tell you now",
										"Cannot predict now",
										"Concentrate and ask again",
										"Don't count on it",
										"My reply is no",
										"My sources say no",
										"Outlook not so good",
										"Very doubtful"];

			var result = Math.floor((Math.random() * sayings.length) + 0);
			message.channel.send(sayings[result]);
    }
    else
    message.channel.send("That's not a question!");
  }

    // Wolfram Question Context
    // Check and make sure the start of the message is the right command
    // Then pass the rest of the phrase to wolfram
    if (message.content.substring(0, 10) == "!question ") {
    	Wolfram.query(message.content.substring(10, message.content.length), function(err, result) {
				if(err)
					message.channel.send("Sorry, I couldn't process the question at this time");
				else if (result.queryresult.pod != undefined) {
					// The final result
					var text = '';
					for(var a=0; a < result.queryresult.pod.length; a++) {
						var pod = result.queryresult.pod[a];
						if (resultOpts.indexOf(pod.$.title) > -1) {
							for(var b=0; b<pod.subpod.length; b++) {
								var subpod = pod.subpod[b];
								for(var c=0; c<subpod.plaintext.length; c++) {
									// We append to the result text just incase there are more than 1 results
									text += "\n**" + resultOpts[resultOpts.indexOf(pod.$.title)] + "**: ```";
									// Sometimes Wolframs decimal points are huge, so if the result is a decimal approximation
									// we cut it down to less characters
									text += resultOpts[resultOpts.indexOf(pod.$.title)] == 'Decimal approximation' ? subpod.plaintext[c].substring(0, 7) + "```" : subpod.plaintext[c] + "```";
								}
							}
						}
					}
					// Send the final reply after all data is collected
					message.channel.send(text);
				} else {
					// If Wolfram doesn't have an answer
					message.channel.send("I don't seem to have an answer to that question");
				}
			});
    }
});

// When a new person joins the server
// let them now about the bot
client.on('serverNewMember', function(server, user) {
	message.sendMessage(server, "A new member has arrived. Welcome, " + user.username + " to " + server.name + ". Type !help for commands.");
});

// When the bot gets dc/d
client.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

// storing jokes in a variable jokes

var jokes = [
    { name: 'Dozen', answer: 'anybody want to let me in?' },
    { name: 'Avenue', answer: 'knocked on this door before?' },
    { name: 'Ice Cream', answer: 'if you don\'t let me in!' },
    { name: 'Adore', answer: 'is between us. Open up!' },
    { name: 'Lettuce', answer: 'in. Its cold out here!' },
    { name: 'Mikey', answer: 'doesnt fit through this keyhole' },
    { name: 'Phillis', answer: 'a glass of water' },
    { name: 'I am deaf', answer: 'WHAT!?' },
    { name: 'Ben', answer: 'Dover' },
    { name: 'Anita', answer: 'Gofradump' },
    { name: 'Rob', answer: 'Banks' },
]

//choosing a random joke from the array

var knock = function() {
    var joke = jokes[Math.floor(Math.random() * jokes.length)]
    return formatJoke(joke)
}

//Formatting the output to return in a new line and plug in the output variables
function formatJoke(joke) {
    return [
        'Knock, knock.',
        'Who’s there?',
        joke.name + '.',
        joke.name + ' who?',
        joke.name + ' ' + joke.answer
    ].join('\n')
}

//Turn the discordjs on to listen to a message
    client.on('message', (message) => {

//Listens to each instance of the message /knock and executes the code below
        if (message.content.includes('/knock')) {
            const msg = message.content.split(' ');

//Function knock() returns the formatted joke
                message.reply(knock());

        }
    });

client.login("NDkyMDEyMzU3MTQ1NTkxODA5.DoQcZQ.6YEUgOL4NpVSaf5-djsycxp4_uE");
