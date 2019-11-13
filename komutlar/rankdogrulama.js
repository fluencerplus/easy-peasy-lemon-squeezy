const Discord = require('discord.js');
const https = require('https');

exports.run = function(client,message,args) {
    var nick = args.join(' ');

    if(!nick) {
        message.channel.send('```Rank Doğrulamanın Doğru Kullanımı = !apex Nick```');
    } else {

    const options = new URL('https://public-api.tracker.gg/v2/apex/standard/profile/origin/' + nick + '?TRN-Api-Key=e3a23e3e-920a-4cca-b0ee-42fe3489abac');
    const req = https.get(options, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            var dat = JSON.parse(data);
            var name = JSON.stringify(dat["data"]["platformInfo"]["platformUserId"]);
            var score = JSON.stringify(dat["data"]["segments"][0]["stats"]["rankScore"]["value"]);
            var level = JSON.stringify(dat["data"]["segments"][0]["stats"]["level"]["value"]);
            const embed = {
                "color": 15158332,
                "author": {
                  "name": "Apex Legends Türkiye"
                },
                "fields": [
                  {
                    "name": name.replace(/\"/g, ""),
                    "value": "Sınırsız katılım linki : https://discord.gg/VGWFZUe"
                  },
                  {
                    "name": "Level",
                    "value": level
                  },
                  {
                    "name": "Rank Puanı",
                    "value": score
                  }
                ]
              };
              message.channel.send({ embed });
              var ranks = ['643363694012792832','643363648269582377','643363555445571584','643363073884684289','643363035372847115','643362860885606410'];
            for(var i = 0;i<6;i++) {
               if(message.member.roles.has(ranks[i])) {
                   message.member.removeRole(ranks[i]);
               }
            }
            setTimeout( () => {
              switch(true)
              {
                case score < 1200:
                  message.member.addRole('643363694012792832');
                  break;
                case score < 2800:
                  message.member.addRole('643363648269582377');
                  break;
                case score < 4800:
                  message.member.addRole('643363555445571584');
                  break;
                case score < 7200:
                  message.member.addRole('643363073884684289');
                  break;
                case score < 10000:
                  message.member.addRole('643363035372847115');
                  break;
                case score >= 10000:
                  message.member.addRole('643362860885606410');
                  break;
              }
            }, 500);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
};

exports.conf = {
  enabled: true,
  aliases: ['apex']
};

exports.help = {
  name: 'ApexTracker',
  description: 'Rank Doğrulamayı Sağlar',
  usage: 'apex'
};
