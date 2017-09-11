const express = require('express');
const router = express.Router();
const {postData, ifUrlExists} = require('../queries/postData.js');
const getData = require('../queries/getData.js');
const getKeywords = require('../queries/getKeywords.js');
const searchData = require('../queries/searchData.js');
const querystring = require('querystring');
const sanitizeUrl = require('./sanitizeUrl');

router.get('/get-resource', (req, response) => {
  getData()
    .then(res => {
        let output = JSON.stringify(res.rows);
        response.writeHead(200, {
          'content-type': 'application/json'
        });
        response.end(output);
      })
      .catch(err => {
        console.log('error with getData in router');
      })
})

router.get('/search', (req, response) => {
  // console.log("i am here");
  // const searchquery = req
  // console.log("I am searchquery: ", searchquery);
  // searchData(searchquery)
  // .then(res => {
  //   let output = JSON.stringify(res.rows);
  //   response.writeHead(200, {
  //     'content-type': 'application/json'
  //   });
  //   response.end(output);
  // })
  // .catch(err => {
  //   console.log('error with searchData in router');
  // })
});

router.get('/keywords-suggestions', (req, res) => {
  console.log("keywords ", req.query.query);
  const searchKeyword = req.query.query

  getKeywords(searchKeyword)
    .then(rawKeywords => {
      const keywords = rawKeywords
        .rows
        .map(row=>row.keywords.split(','))
        .reduce((a,b)=>[...a,...b],[])
        .map(keyword=>keyword.trim())
        .sort()
        .filter((el, i, a) => a.indexOf(el) === i) //Unique in array https://stackoverflow.com/questions/1960473/unique-values-in-an-array

      // var keywordsStrings = []
      // keywords.forEach(keywordsArray=>{
      //   keywordsStrings = [...keywordsStrings, ...keywordsArray]
      //   keywordsStrings.concat(keywordsArray)
      // })

      res.status(200).send({
        query: "Unit",
        suggestions: keywords
      })
    })
    .catch(err => {
      console.log('error with getKeywords in router');
      console.log(err)
      res.status(500).send(err)
    })
})

router.post('/add-resource', (req, res) => {
  const sanitizedUrl = sanitizeUrl(req.body.url);

  ifUrlExists(sanitizedUrl)
  .then(response => {
    if (response.rowCount > 0) throw new Error('URL already exists')
    else {
      postData(sanitizedUrl, req.body.title, req.body.keywords)
    }
  })
  .then( ()=> {
    console.log('success');
    res.redirect('/');
  }
  )
  .catch(err => {
    console.log("problem with the database: ", err)
  })
});

module.exports = router;
