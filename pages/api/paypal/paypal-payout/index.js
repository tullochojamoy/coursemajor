'use strict';
//Load files library
var fs = require('fs');
var path = require('path');

const axios = require('axios'); //Library to manage complex rest services
const http = require('https'); //Libraries to handle be rest
const uniqid = require('uniqid'); //Generate unique ids

const User = require('../../../../models/usersModel');

const { isAuth, isSellerOrAdmin } = require('../../../../utils/utils old');

const generatePayoutPaypal = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findOne({ _id: userId });

  //Set PayPal API to Live or Sandbox
  const live = false;
  let PAYPAL_API = 'api.paypal.com';

  if (live === true) {
    PAYPAL_API = 'api.paypal.com';
  } else if (live === false) {
    PAYPAL_API = 'api.sandbox.paypal.com';
  }

  if (user.hackerDetected)
    return res
      .status(404)
      .send({ message: 'SUCK YOU MADA HACKER BWOOYY, GO LOOK A JOB' });

  //let username = 'Abss2pgNYLyVb-QVaiovFTxpOA8YP4Gni4Iold7YoESmyaubx1znakSTjXIMRz55-UpW0_cOT8x0e9HG';
  //let password = 'EFl7VYSmsmQsWMu7yQcGWBkYDNmjjrM2cHykSz6zNtjEx-5ecSg7I-3gArk6xbGwB25R48_CRu89-_JW';
  //let access_token='';
  //let token_type="";
  let username = process.env.PAYPAL_CLIENT_ID;
  let password = process.env.PAYPAL_SECRET;

  const {
    data: { access_token, token_type },
  } = await axios({
    //Destruction of data to obtain access_token
    url: `https://${PAYPAL_API}/v1/oauth2/token`, //change this url in production https://api.paypal.com
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en_US',
      'content-type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: username, //you username are you client id
      password: password, //you password are you secret
    },
    params: {
      grant_type: 'client_credentials',
    },
  });

  if (access_token) {
    let params = {
      mode: 'PAYPAL_ID',
      phone: user.paypal.phone,
      email: user.paypal.email,
      //email: 'sb-aebxh5249472@personal.example.com',
      //phone: 1876358407,
      //paypal_id: 'DAZXQHH9JVWEJ',
      paypal_id: user.paypal.clientId,
      value: user.balance.currentBalance,
    };

    let mode = params.mode;
    console.log(params);
    let batch_code = uniqid();

    //This comes from the paypal doc
    //Important here you must put in authorization: "Bearer" + params.token to put the new token that is generated each
    //petition
    var options = {
      method: 'POST',
      hostname: PAYPAL_API,
      port: null,
      path: '/v1/payments/payouts',
      headers: {
        accept: 'application/json',
        //"authorization": "Bearer " + access_token,
        authorization: token_type + ' ' + access_token,
        'content-type': 'application/json',
      },
    };

    //Doc payouts paypal
    //Handler from request to your api
    //START REQUEST
    var req = http.request(options, function (res) {
      var chunks = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString()); //This prints your answer
      });
    });

    //If mode is EMAIL type
    if (mode == 'EMAIL') {
      let email = user.paypal.email;
      //params.email;//destination
      let amount_to_collect = params.value; //what you will pay

      req.write(
        JSON.stringify({
          sender_batch_header: {
            email_subject: 'Payment made',
            sender_batch_id: 'batch-' + batch_code,
          }, //unicode generate different_ids
          items: [
            {
              recipient_type: 'EMAIL', //currently using
              amount: { value: amount_to_collect, currency: 'USD' },
              receiver: email,
              note: 'Payment from the backend with node, token working',
            },
          ],
        })
      );
      req.end(); //END OF REQUEST

      user.withdrawBalance(amount_to_collect);
      await user.save();

      //return answer to the front
      return res.status(200).send({
        status: 'success',
        message: 'Payment made to: ' + email,
      });
    }
    //If mode is PHONE type
    if (mode == 'PHONE') {
      let phone = user.paypal.phone;
      //params.phone;
      let amount_to_collect = params.value;

      req.write(
        JSON.stringify({
          sender_batch_header: {
            email_subject: 'Payment made',
            sender_batch_id: 'batch-' + batch_code,
          }, //unicode generate different_ids
          items: [
            {
              recipient_type: 'PHONE', //by phone
              amount: { value: amount_to_collect, currency: 'USD' },
              receiver: phone,
              note: 'User payment by phone', //by email
              sender_item_id: 'item-1-1589160337416',
            },
          ],
        })
      );
      req.end();

      user.withdrawBalance(amount_to_collect);
      await user.save();

      return res.status(200).send({
        status: 'success',
        message: 'Payment made to: ' + phone,
      });
    }

    //If mode is type PAYPAL_ID
    if (mode == 'PAYPAL_ID') {
      let paypal_id = user.paypal.clientId;
      //params.paypal_id;
      let amount_to_collect = params.value;

      req.write(
        JSON.stringify({
          sender_batch_header: {
            email_subject: 'Payment made',
            sender_batch_id: 'batch-' + batch_code,
          }, //unicode generate different_ids
          items: [
            {
              recipient_type: 'PAYPAL_ID', //by id paypal
              amount: { value: amount_to_collect, currency: 'USD' },
              receiver: paypal_id,
              note: 'Payment to user by id',
            },
          ],
        })
      );
      req.end();

      //user.balance.currentBalance = user.balance.currentBalance-amount_to_collect;
      user.withdrawBalance(amount_to_collect);
      await user.save();

      return res.status(200).send({
        status: 'success',
        message: 'Payment made to: ' + paypal_id,
      });
    }
  }
};


//For PayPal Payouts
nextConnect().use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

export default nextConnect().put(isAuth, isSellerOrAdmin, generatePayoutPaypal);