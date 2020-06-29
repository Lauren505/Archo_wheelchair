'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
var bodyParser = require('body-parser');
var yourdata = "";

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log(event)
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  if(event.message.text === "archo"){
    
  return client.replyMessage(event.replyToken, { type: 'text', text: "Hi!" });
    
  }else if(event.message.text === "阿醜在哪"){
    
  return client.replyMessage(event.replyToken, { type: 'text', text: "不知道啦" });
    
  }else if(event.message.text === "阿醜在幹嘛"){
    
  return client.replyMessage(event.replyToken, { type: 'text', text: yourdata });
    
  }else{

  // create a echoing text message
  const echo = { type: 'text', text: "輸入: \n阿醜在哪\n阿醜在幹嘛" };
  console.log(typeof echo);

  // use reply API
  return client.replyMessage(event.replyToken, echo);
  }
}

app.use(bodyParser.json());

app.post('/send',(req,res) =>{
  var json=req.body;   // 取出POST資料本體
  console.log(json);
  console.log(req.body.Direction);
  concole.log(typeof req.body.Direction);
    let message = {
        type: 'text',
        text: req.body.Direction
      };
    client.pushMessage("U3c62a1ade09ec47084828d746e778c15",message)
    .then(() => {
        console.log("Message pushed")
        res.send("message sent: ")
    })
    .catch((err) => {
        res.send("error pushing message")
    // error handling
    });
})

app.post('/test',function(req,res){   // JSON資料的處理程式
  var json=req.body;   // 取出POST資料本體
  console.log(json);
  /*.then(() => {
      console.log("Message pushed")
      res.send("msg from post")
  })
  .catch((err) => {
      res.send("error pushing message")
  // error handling
  });*/
  yourdata = req.body.Direction;
});

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
