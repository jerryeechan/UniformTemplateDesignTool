var req = require("request");
var headers = {
  Authorization: "key=AIzaSyAHC_Q4_zBkcAr1oDnWwdlVheuW8yOTuZ8",
  "Content-Type": "application/json"
};
var formdata = {
  to:
    "c4pEj9pxej0:APA91bFb15NyP2j-wBgyPXd4wiKDsyWbigLN7Maa2bLf95A1uzUgJy-f778bcAcyrbqxrZNDudhXmVK2kE5L5X3kUl0wK-LWCzhxJ9VUkdcYDNW2Gik-j1RXBtVlrphA18_SHxpYnI3-",
  notification: {
    title: "Portugal vs. Denmark",
    body: "mybody",
    icon: "firebase-logo.png",
    click_action: "http://localhost:8081"
  }
};
console.log(formdata);
req.post(
  {
    headers: headers,
    url: "https://fcm.googleapis.com/fcm/send",
    body: JSON.stringify(formdata)
  },
  function(error, response, body) {
    //console.log(response.statusCode, body);
    if (response.statusCode == 200) {
      console.log(body);
    } else {
      console.log(response.statusCode);
    }
  }
);
