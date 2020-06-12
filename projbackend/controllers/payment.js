var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "f92wp2d5tp7tv38w",
  publicKey: "cktvpwy6d925n9yd",
  privateKey: "b6a947e657da3eb253d9a30378513d11"
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        }else{
            res.send(response)
        }
    });
}

exports.processPayment = (req, res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amoutFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amoutFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if (err) {
            res.status(500).json(err)
          } else {
              res.json(result)
          }
      });
}