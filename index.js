const TelegramBot = require("node-telegram-bot-api");
const token = process.env['MY_SECRET']; // Add your bot token from @botfather for this to work
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

      else if (xtxt == "/stop" || xtxt==="/stop@Truth_Dare2_Bot"
    ) {
        if (nameArr.length < 2)
          bot.sendMessage(chatId, "Need 2 or More Players  To Play!");
        else {

continu: bot.sendMessage(chatId, "Game Started....Choosing 2 Random Players , One Will Ask Truth/Dare , Other Will Answer");
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
            "\n So " + answerer.nm + " , What you want to answer? Truth or Dare?", {
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
              console.log("player:"+player+" arr  :"+answerer.nm);
          
              if(player === answerer.nm&&choice==="1")
              {
              bot.sendMessage(asker.CiD, answerer.nm + " Chose Truth . Kindly Give Him a Truth , You Have 60s to Act , If You Fail to ask him a Truth Within 30s , I will Ask him a Truth... You can Also Use /pass to allow me to Instantly give him a truth on behalf of you \n kindly use /q command before the question");
              bot.on("message", (msg) => {
                console.log(msg);
                const Id0 = msg.chat.id;
                const txtP = msg.text;
                const nmP = msg.from.first_name;
                console.log(msg);


                
                
                if ((txtP == "/pass" || txtP == "/pass@Truth_Dare2_Bot") && nmP == asker.nm) {
                  botTruth(Id0, nmP, answerer.nm, answerer.CiD);
                }
                else if((txtP!="/pass"||txtP!="/pass@Truth_Dare2_Bot")&& nmP == asker.nm){
                  bot.sendMessage(Id0, "Here is Your Truth , " + answerer.nm + " : " + txtP + "   You Have 30s to Answer ! \n kindly use /a before ur answer to answer ");
                bot.on("message", (msg) => {
                  const Id1 = msg.chat.id;
                  const txt1 = msg.text;
                  const nm1 = msg.from.first_name;

      


                  if (nm1 == answerer.nm)
                    bot.sendMessage(answerer.CiD, nm1 + " Answered His Truth With " + txt1.replace("/a","")+"\n To Play Again Send /replay");
                    
    

                  
                ;})}
                setTimeout(function () {

                  if(txtP.length==0&&nmP==asker.nm)
                  {
                  bot.sendMessage(Id0, "Time Wasting Mf didnt gave him a Truth  , I will give him a Truth");
                  botTruth(Id0, nmP, answerer.nm, answerer.CiD);}
                


               
              }
             ,60000 )
            })}
            
             else if (choice === "2" && player === answerer.nm){
              bot.sendMessage(asker.CiD, answerer.nm + " Choosed Dare . Kindly Give Him a Dare , You Have 60s to Act , If You Fail to give him a Dare Within 30s , I will Give him a Dare... You can Also Use /pass to allow me to Instantly give him a Dare on behalf of you");
              bot.on("message", (msg) => {
                const Id0 = msg.chat.id;
                const txtP = msg.text;
                const nmP = msg.from.first_name;
                if ((txtP == "/pass" || txtP == "/pass@Truth_Dare2_Bot") && nmP == asker.nm) {
                  botDare(Id0, nmP, answerer.nm, answerer.CiD);
                }
                else if ((txtP != '/pass'||txtP!="/pass@Truth_Dare2_Bot")&& nmP == asker.nm){

                  bot.sendMessage(Id0, "Here is Your Dare , " + answerer.nm + " : " + txtP + "   You Have 60s to Answer ! ");
                  bot.on("message",  (msg) => {
                    const Id1 = msg.chat.id;
                    const txt1 = msg.text;
                    const nm1 = msg.from.first_name;
                    if (nm1 == answerer.nm)
                      bot.sendMessage(answerer.CiD, nm1 + " Answered His Dare With " + txt1);
                    });
                    setTimeout(function () {

                  if(txtP.length==0)
                      {
                      bot.sendMessage(Id0, "Time Wasting Mf didnt gave him a Truth  , I will give him a Truth");
                      botTruth(Id0, nmP, answerer.nm, answerer.CiD);}

                     if(txt1.length==0)
                     bot.sendMessage(Id0, "Times Up , send /again to play again with same players that joined before or start a new game by /start");

                    },60000);
                 
                    
                    }
  
             })

             bot.on("message", (msg) => {
              const Idr = msg.chat.id;
              const txtr = msg.text;
              const nmR = msg.from.first_name;
              if(txtr==="/again")
            againPlay(Idr);
            })


                }
        })
              }
          }})
        }
      }
    
);

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
      const ques = response.data;

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
      const ques1 = response1.data;

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

function againPlay(cid90)
{
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
    "\n So " + answerer.nm + " , What you want to answer? Truth or Dare?", {
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
      console.log("player:"+player+" arr  :"+answerer.nm);
  
      if(player === answerer.nm&&choice==="1")
      {
      bot.sendMessage(asker.CiD, answerer.nm + " Chose Truth . Kindly Give Him a Truth , You Have 60s to Act , If You Fail to ask him a Truth Within 30s , I will Ask him a Truth... You can Also Use /pass to allow me to Instantly give him a truth on behalf of you \n kindly use /q command before the question");
      bot.on("message", (msg) => {
        console.log(msg);
        const Id0 = msg.chat.id;
        const txtP = msg.text;
        const nmP = msg.from.first_name;
        console.log(msg);


        
        
        if ((txtP == "/pass" || txtP == "/pass@Truth_Dare2_Bot") && nmP == asker.nm) {
          botTruth(Id0, nmP, answerer.nm, answerer.CiD);
        }
        else if((txtP!="/pass"||txtP!="/pass@Truth_Dare2_Bot")&& nmP == asker.nm){
          bot.sendMessage(Id0, "Here is Your Truth , " + answerer.nm + " : " + txtP + "   You Have 30s to Answer ! \n kindly use /a before ur answer to answer ");
        bot.on("message", (msg) => {
          const Id1 = msg.chat.id;
          const txt1 = msg.text;
          const nm1 = msg.from.first_name;




          if (nm1 == answerer.nm)
            bot.sendMessage(answerer.CiD, nm1 + " Answered His Truth With " + txt1.replace("/a","")+"\n To Play Again Send /replay");
            


          
        ;})}
        setTimeout(function () {

          if(txtP.length==0&&nmP==asker.nm)
          {
          bot.sendMessage(Id0, "Time Wasting Mf didnt gave him a Truth  , I will give him a Truth");
          botTruth(Id0, nmP, answerer.nm, answerer.CiD);}
        


       
      }
     ,60000 )
    })}
    
     else if (choice === "2" && player === answerer.nm){
      bot.sendMessage(asker.CiD, answerer.nm + " Choosed Dare . Kindly Give Him a Dare , You Have 60s to Act , If You Fail to give him a Dare Within 30s , I will Give him a Dare... You can Also Use /pass to allow me to Instantly give him a Dare on behalf of you");
      bot.on("message", (msg) => {
        const Id0 = msg.chat.id;
        const txtP = msg.text;
        const nmP = msg.from.first_name;
        if ((txtP == "/pass" || txtP == "/pass@Truth_Dare2_Bot") && nmP == asker.nm) {
          botDare(Id0, nmP, answerer.nm, answerer.CiD);
        }
        else if ((txtP != '/pass'||txtP!="/pass@Truth_Dare2_Bot")&& nmP == asker.nm){

          bot.sendMessage(Id0, "Here is Your Dare , " + answerer.nm + " : " + txtP + "   You Have 60s to Answer ! ");
          bot.on("message",  (msg) => {
            const Id1 = msg.chat.id;
            const txt1 = msg.text;
            const nm1 = msg.from.first_name;
            if (nm1 == answerer.nm)
              bot.sendMessage(answerer.CiD, nm1 + " Answered His Dare With " + txt1);
            });
            setTimeout(function () {

          if(txtP.length==0)
              {
              bot.sendMessage(Id0, "Time Wasting Mf didnt gave him a Truth  , I will give him a Truth");
              botTruth(Id0, nmP, answerer.nm, answerer.CiD);}

             if(txt1.length==0)
             bot.sendMessage(Id0, "Times Up");

            },60000);
         
            
            }

     })
        }
})
      }
