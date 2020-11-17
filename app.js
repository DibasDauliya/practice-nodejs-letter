const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {

    // res.send('hi')

    res.sendFile(`${__dirname}/signup.html`)

})

app.post('/', function(req, res) {
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    
    const data = {
        members: [
            {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }
    ]
    };

    const jsonData = JSON.stringify(data)

    const url = ' https://us7.api.mailchimp.com/3.0/lists/e3aef38441'
    const options = {
        method: "POST",
        auth: "dibas:14653993cc647bc2b38ea977a21ab40f-us7"
    }

    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200) {
            res.sendFile(`${__dirname}/success.html`)
        } else {
            res.sendFile(`${__dirname}/failure.html`)
        }

        response.on('data', function(data) {
            // console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end()
})

app.post('/failure', function(req, res) {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server is started in port 3000');
})

// 14653993cc647bc2b38ea977a21ab40f-us7

// e3aef38441