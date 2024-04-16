const TelegramBot = require("node-telegram-bot-api");
const token = "6600294458:AAEHTfwaQkZ4ep3u7aXu8PSoEq_M-i0L20A"; // Add your bot token from @botfather for this to work
const axios = require("axios");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const bot = new TelegramBot(token, { polling: true });
const nameArr = [];
const chatIdArr = [];

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const txt = msg.text;
  if (txt == "/start") {
    bot.sendMessage(chatId, "Bot Started , To play Truth Or Dare , Interested People Kindly send /join . After Everyone Joined Send /stop to Stop Accepting Participants and play the game");


    bot.on("message", async (msg) => {

      const xchatId = msg.chat.id;
      const xtxt = msg.text;
      const xname = msg.from.first_name;
      if (xtxt === "/join" || xtxt === "/join@Truth_Dare2_Bot") {
        chatIdArr.push(xchatId);
        nameArr.push(xname);
        bot.sendMessage(chatId, xname + "  Joined The Game ")
      }

      else if (xtxt == "/stop" || xtxt==="/stop@Truth_Dare2_Bot") {
        if (nameArr.length < 2)
          bot.sendMessage(chatId, "Need 2 or More Players  To Play!");
        else {
          bot.sendMessage(chatId, "Game Started....Choosing 2 Random Players , One Will Ask Truth/Dare , Other Will Answer");
          const rnd1 = random(nameArr.length);
          let rnd2 = random(nameArr.length);
          while (rnd1 == rnd2) {
            rnd2 = random(nameArr.length);
          }


          let asker = {
            nm: nameArr[rnd1],
            CiD: chatIdArr[rnd1],
          };
          let answerer =
          {
            nm: nameArr[rnd2],
            CiD: chatIdArr[rnd2],
          };

          bot.sendMessage(asker.CiD, asker.nm + " will select the truth/dare Question for " + answerer.nm +
            "\n " + answerer.nm + " , What you want to answer? Truth or Dare?", {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Truth", callback_data: "1" }],
                [{ text: "Dare", callback_data: "2" }],
              ],
            },
          });


          bot.once("callback_query", (query) => {
            const choice = query.data;
            const player = query.from.first_name;

            if (choice === "1" && player === answerer.nm) {
              bot.sendMessage(asker.CiD, answerer.nm + " Choosed Truth . Kindly Give Him a Truth , You Have 30s to Act , If You Fail to ask him a Truth Within 30s , I will Ask him a Truth... You can Also Use /pass to allow me to Instantly give him a truth on behalf of you");
              bot.on("message", async (msg) => {
                const Id0 = msg.chat.id;
                const txtP = msg.text;
                const nmP = msg.from.first_name;
                if ((txtP == "/pass" || txtP == "/pass@Truth_Dare2_Bot") && nmP == asker.nm) {
                  botTruth(Id0, nmP, answerer.nm, answerer.CiD);
                }
                else
                  setTimeout(function () {
                    if (txtP == '') {
                      bot.sendMessage(Id0, "Time Wasting Mf didnt asked the truth , I will Ask You The Truth ");
                      botTruth(Id0, nmP, answerer.nm, answerer.CiD);
                    }
                    else
                      bot.sendMessage(Id0, "Here is Your Truth , " + answerer.nm + " : " + txtP + "   You Have 30s to Answer ! ");
                    bot.on("message", async (msg) => {
                      const Id1 = msg.chat.id;
                      const txt1 = msg.text;
                      const nm1 = msg.from.first_name;
                      if (nm1 == answerer.nm)
                        bot.sendMessage(answerer.CiD, nm1 + " Answered His Truth With " + txt1);
                    });
                  }

                  )
              }
              )

            }
            else if (choice === "2" && player === answerer.nm){
              bot.sendMessage(asker.CiD, answerer.nm + " Choosed Dare . Kindly Give Him a Dare , You Have 30s to Act , If You Fail to give him a Dare Within 30s , I will Give him a Dare... You can Also Use /pass to allow me to Instantly give him a Dare on behalf of you");
              bot.on("message", async (msg) => {
                const Id0 = msg.chat.id;
                const txtP = msg.text;
                const nmP = msg.from.first_name;
                if ((txtP == "/pass" || txtP == "/pass@Truth_Dare2_Bot") && nmP == asker.nm) {
                  botDare(Id0, nmP, answerer.nm, answerer.CiD);
                }
                else
                  setTimeout(function () {
                    if (txtP == '') {
                      bot.sendMessage(Id0, "Time Wasting Mf didnt gave him a Dare  , I will give him a Dare ");
                      botDare(Id0, nmP, answerer.nm, answerer.CiD);
                    }
                    else
                      bot.sendMessage(Id0, "Here is Your Dare , " + answerer.nm + " : " + txtP + "   You Have 30s to Answer ! ");
                    bot.on("message", async (msg) => {
                      const Id1 = msg.chat.id;
                      const txt1 = msg.text;
                      const nm1 = msg.from.first_name;
                      if (nm1 == answerer.nm)
                        bot.sendMessage(answerer.CiD, nm1 + " Answered His Dare With " + txt1);
                      });
                    }
  
                    )
                }
                )
              }
          })
        }
      }
    })
  }
})

function random(arrLen) {
  return Math.floor(Math.random() * arrLen);
}


function botTruth(asker_CiD, asker_nm, answerer_nm, answerer_CiD) {


  bot.sendMessage(asker_CiD, " Fine I will Choose A Truth For You , Please Set Maturity Level", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "R (18+) ", callback_data: "r" }],
        [{ text: "PG13 (13+) ", callback_data: "pg13" }],
        [{ text: "PG(Any)", callback_data: "pg" }],
      ],
    },
  });

  bot.once("callback_query", async (query) => {
    const qNo = query.data;
    const playerx = query.from.first_name;
    if (playerx === asker_nm) {
      const url = "https://api.truthordarebot.xyz/v1/truth?rating=" + qNo;



      const response = await axios(url);
      const ques = await response.json();

      const res1 = ques.question;

      bot.sendMessage(answerer_CiD, "Here is Your Question : " + res1);
      bot.on("message", async (msg) => {
        const Id1 = msg.chat.id;
        const txt1 = msg.text;
        const nm1 = msg.from.first_name;
        if (nm1 == answerer_nm)
          bot.sendMessage(answerer_CiD, nm1 + " Answered His Truth With " + txt1);

      })
    }

  }
  )
}
function botDare(asker_CiD, asker_nm, answerer_CiD, answerer_nm) {
  bot.sendMessage(asker_CiD, " Fine I will Choose A Dare For You , Please Set Maturity Level", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "R (18+) ", callback_data: "r" }],
        [{ text: "PG13 (13+) ", callback_data: "pg13" }],
        [{ text: "PG(Any)", callback_data: "pg" }],
      ],
    },
  });

  bot.once("callback_query", async (query) => {
    const qNo1 = query.data;
    const playerx1 = query.from.first_name;
    if (playerx1 === asker_nm) {
      const url1 = "https://api.truthordarebot.xyz/v1/dare?rating=" + qNo1;



      const response1 = await axios(url1);
      const ques1 = await response1.json();

      const res11 = ques1.question;

      bot.sendMessage(answerer_CiD, "Here is Your Question : " + res11);
      bot.on("message", async (msg) => {
        const Id111 = msg.chat.id;
        const txt111 = msg.text;
        const nm111 = msg.from.first_name;
        if (nm111 == answerer_nm)
          bot.sendMessage(answerer_CiD, nm111 + " Answered His Dare With " + txt111);

      })
    }

  }
  )
}
