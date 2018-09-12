var xml = require("xmlhttprequest");
var DomParser = require("dom-parser");
var urlparse = require("url");
function getimg(url) {
  return new Promise((resolve, reject) => {
    var xmlHttp = null;
    var xhttp = new xml.XMLHttpRequest();
    console.log(xhttp);
    xhttp.withCredentials = true;
    // xhttp.onload = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     var content = xhttp.responseText;
    //     var l = parseString(content, url);
    //     resolve(l);
    //   }
    // };
    xhttp.onreadystatechange = e => {
      if (xhttp.readyState === 4) {
        //if complete
        if (xhttp.status === 200) {
          //check if "OK" (200)
          //success
          var content = xhttp.responseText;
          var l = parseString(content, url);
          resolve(l);
        } else {
          //error
          console.error(xhttp.response);
          console.error(xhttp.responseText);
          resolve(null);
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
  });
}
urla = "http://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/";
urlb = "https://www.pinterest.com/pin/590745676094209629/";

getimg(urlb).then(l => {
  console.log(l);
});
function parseString(str, url) {
  parser = new DomParser();
  urlList = [];
  htmlDoc = parser.parseFromString(str, "text/xml");
  var tags = htmlDoc.getElementsByTagName("img");
  //console.log(tags);
  tags.forEach(tag => {
    var src = tag.getAttribute("src");
    if (src.search("http") == -1) {
      src = "http://" + urlparse.parse(url).host + src;
    }

    urlList.push(src);
    //console.log(tag.src);
  });
  return urlList;
}
