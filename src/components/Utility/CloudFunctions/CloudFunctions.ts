export class CloudFunctions {
  static getImagesFromURL(url: string, limit: number) {
    var requestUrl =
      "https://us-central1-sketch-academy-share.cloudfunctions.net/getAllImgFromUrl";
    return new Promise<string>((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      // xhr.onload = function(event) {
      //   var blob = xhr.response;
      //   resolve(blob);
      // };
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          //if complete
          if (xhr.status === 200) {
            //check if "OK" (200)
            //success
            resolve(xhr.response);
            resolve(xhr.responseText);
          } else {
            //error
            console.error(xhr.response);
            console.error(xhr.responseText);

            resolve(null);
          }
        }
      };
      // xhr.open("POST", requestUrl);
      // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      // xhr.send(JSON.stringify({ url: url, paging: limit }));
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.send();
      // xhr.setRequestHeader();
    });
  }
}
