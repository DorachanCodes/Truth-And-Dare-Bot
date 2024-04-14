const TelegramBot = require("node-telegram-bot-api");
const token ="TOKEN"; // Add your bot token from @botfather for this to work
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

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const txt = msg.text;
  if(txt=="/start")
  bot.sendMessage(chatId,"Bot Started , To play Truth Or Dare , Interested People Kindly send /join within 30s");
})

bot.on("message", async (msg) => {

    const chatIdArr=[];
const nameArr=[]
    const chatId = msg.chat.id;
    const txt = msg.text;
    const name =msg.from.first_name;
    if(txt==="/join")
    {
chatIdArr.push(chatId);
nameArr.push(name);
bot.sendMessage(chatId,name+"  Joined The Game ")
    }
})


setTimeout(opx, 30000);

function opx(chattId)
{
    bot.sendMessage(chattId,"Game Start....Choosing 2 Random Players , One Will Ask Truth/Dare , Other Will Answer");
    const rnd1=random(nameArr.length);
    const rnd2=random(nameArr.length);
    if(rnd1==rnd2)
    {
        rnd2=(rnd2+2)/2;
    }
let asker = {
    nm : nameArr[rnd1],
    CiD : chatIdArr[rnd1],};
    let answerer =
    {
        nm : nameArr[rnd2],
        CiD : chatIdArr[rnd2],};



        bot.sendMessage(asker.CiD,asker.nm+" will select the truth/dare Question for " +answerer.nm+
     "\n " + answerer.nm+"  Please Select Truth/Dare ",{reply_markup: {
        inline_keyboard: [
          [{ text: "Truth", callback_data: "1" }],
          [{ text: "Dare", callback_data: "2" }],
        ],
      },
});


bot.once("callback_query", (query) => {
    const choice = query.data;
    const player =query.from.first_name;

    if(choice==="1"&&player===answerer.nm)
    {
    bot.sendMessage(asker.CiD,answerer.nm+" Chose Truth . Kindly Give Him a Truth , You Have 30s to Act , If You Fail to ask him a Truth Within 30s , I will Ask him a Truth... You can Also Use /pass to allow me to Instantly give him a truth on behalf of you");
   setTimeout(function()
{
    bot.on("messsage"),async (msg)=>
    {
 const Id0=msg.chat.id;
 const txtP=msg.text;
 const nmP=mag.from.first_name;
 if(txtP!="/pass"&&nmP==asker.nm)
 {
 bot.sendMessage(Id0, "Here is Your Truth , "+answerer.nm+" : "+txtP+"   You Have 30s to Answer ! ");
 bot.on("messsage"),async (msg)=>
    {
 const Id1=msg.chat.id;
 const txt1=msg.text;
 const nm1=mag.from.first_name;
if(nm1==answerer.nm)
bot.sendMessage(answerer.CiD,nm1+" Answered His Truth With "+txt1);
    };}
    else if(txtP==="/pass"&&nmP==asker.nm)
    {
bot.sendMessage(asker.CiD,"Fine I will Choose A Truth For You , Please Set Maturity Level",{reply_markup: {
    inline_keyboard: [
      [{ text: "R (18+) ", callback_data: "r" }],
      [{ text: "PG13 (13+) ", callback_data: "pg13" }],
      [{ text: "PG(Any)", callback_data: "pg" }],
    ],
  },
});

bot.once("callback_query", (query) => {
    const qNo = query.data;
    const playerx =query.from.first_name;
   if(playerx===asker.nm)

{
        const url = "https://api.truthordarebot.xyz/v1/truth?rating=" + qNo;
        
      
    
          const response = await fetch(url);
          const ques = await response.json();
      
          const res1 = ques.question;
       
          bot.sendMessage(answerer.CiD,"Here is Your Question : " + res1);
          bot.on("messsage"),async (msg)=>
          {
       const Id1=msg.chat.id;
       const txt1=msg.text;
       const nm1=mag.from.first_name;
      if(nm1==answerer.nm)
      bot.sendMessage(answerer.CiD,nm1+" Answered His Truth With "+txt1);

    }}

}
)

} else if( choice==="2"&&player===answerer.nm )
{
    bot.sendMessage(asker.CiD,answerer.nm+" Chose Dare . Kindly Give Him a Dare , You Have 30s to Act , If You Fail to ask him a Dare Within 30s , I will Ask him a Dare... You can Also Use /pass to allow me to Instantly give him a Dare on behalf of you");
    setTimeout(function()
 {
     bot.on("messsage"),async (msg)=>
     {
  const Id10=msg.chat.id;
  const txt1P=msg.text;
  const nm1P=mag.from.first_name;
  if(txt1P!="/pass"&&nm1P==asker.nm)
  {
  bot.sendMessage(Id10, "Here is Your Dare , "+answerer.nm+" : "+txt1P+"   You Have 30s to Answer ! ");
  bot.on("messsage"),async (msg)=>
     {
  const Id11=msg.chat.id;
  const txt11=msg.text;
  const nm11=msg.from.first_name;
 if(nm11==answerer.nm)
 bot.sendMessage(answerer.CiD,nm11+" Answered His Truth With "+txt11);
     };}
     else if(txtP==="/pass"&&nmP==asker.nm)
     {
 bot.sendMessage(asker.CiD,"Fine I will Choose A Dare For You , Please Set Maturity Level",{reply_markup: {
     inline_keyboard: [
       [{ text: "R (18+) ", callback_data: "r" }],
       [{ text: "PG13 (13+) ", callback_data: "pg13" }],
       [{ text: "PG(Any)", callback_data: "pg" }],
     ],
   },
 });
 
 bot.once("callback_query", (query) => {
     const qNo1 = query.data;
     const playerx1 =query.from.first_name;
    if(playerx1===asker.nm)
 
 {
         const url1 = "https://api.truthordarebot.xyz/v1/dare?rating=" + qNo1;
         
       
     
           const response1 = await fetch(url1);
           const ques1 = await response.json();
       
           const res11 = ques1.question;
        
           bot.sendMessage(answerer.CiD,"Here is Your Question : " + res11);
           bot.on("messsage"),async (msg)=>
           {
        const Id111=msg.chat.id;
        const txt111=msg.text;
        const nm111=mag.from.first_name;
       if(nm111==answerer.nm)
       bot.sendMessage(answerer.CiD,nm111+" Answered His DareWith "+txt111);
 
     }}
 
 }
 )







     }
 



},30000);
}
else if(choice==="2"&&player===answerer.nm)
{
    bot.sendMessage(asker.CiD,answerer.nm+" Chose Truth . Kindly Give Him a Truth , You Have 30s to Act , If You Fail to ask him a Truth Within 30s , I will Ask him a Truth... You can Also Use /pass to allow me to Instantly give him a truth on behalf of you");
    setTimeout(function()
 {
     dare()
 },30000);
 }
}
});}})

    



function random(arrLen)
{
return Math.floor(Math.random()*arrLen);
}
function truth()
{
    bot.on("messsage"),async (msg)=>
   {
const Id0=msg.chat.id;
const txt=msg.text;

   }
}
}
