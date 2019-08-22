var http = require("http");
var https = require("https");

var timer;

var price = () => {
  var outputBTC = (c, d) => {
    process.stdout.write(`${c}: ${JSON.parse(d.toString("utf8"))[0][1]}  \n`);
  };

  process.stdout.write(`\n------===============BTC=====================\n`);
  https
    .get("https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD", res => {
      res.on("data", d => {
        outputBTC("BTC", d);
      });
    })
    .on("error", e => {
      console.error(e);
    });

  https
    .get("https://api-pub.bitfinex.com/v2/tickers?symbols=tLTCUSD", res => {
      res.on("data", d => {
        outputBTC("LTC", d);
      });
    })
    .on("error", e => {
      console.error(e);
    });

  https
    .get("https://api-pub.bitfinex.com/v2/tickers?symbols=tZECUSD", res => {
      res.on("data", d => {
        outputBTC("ZEC", d);
      });
    })
    .on("error", e => {
      console.error(e);
    });

  https
    .get("https://api-pub.bitfinex.com/v2/tickers?symbols=tETHUSD", res => {
      res.on("data", d => {
        outputBTC("ETH", d);
      });
    })
    .on("error", e => {
      console.error(e);
    });

  http
    .get("http://api.money.126.net/data/feed/FX_USDCNY", res => {
      res.on("data", d => {
        process.stdout.write(
          `\nUSD<>CNY: ${
            d.toString("utf8").match(/\"price\":\d\.\d\d\d/)[0]
          }`.replace('"price":', "")
        );
      });
    })
    .on("error", e => {
      console.error(e);
    });

  https
    .get(
      "https://lf.lianjia.com/ershoufang/l2c2011047754419/?sug=%E7%B4%AB%E7%AB%B9%E5%9B%ADA%E5%8C%BA",
      res => {
        process.stdout.write(
          `\n=======================ZZY====================\n`
        );

        res.on("data", d => {
          var houseInfo = d
            .toString("utf8")
            .match(/\<div\sclass="(houseInfo|priceInfo)">.*?<\/div>/g);

          if (houseInfo) {
            houseInfo.forEach(itm => {
              if (itm.match(/\|.+\|/)) {
                console.log(itm.match(/\|.+\|/)[0]);
              } else {
                console.log(
                  itm.match(/<span>.*?<\/span>/)[0].match(/\d+/)[0] + "w"
                );
                console.log("\n");
              }
            });
            // process.stdout.write(`\nZZY Price: ${houseInfo}`);
          }
        });
      }
    )
    .on("error", e => {
      console.error(e);
    });
};

//create a server object:
http
  .createServer(function(req, res) {
    if (timer || timer === undefined) {
      clearTimeout(timer);
      timer = setTimeout(price, 1000);
    }

    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
