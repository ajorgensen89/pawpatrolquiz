const axios = require("axios");

const options = {
    method: 'POST',
    url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '40e30a1a0emsh30073850ade8fc4p12c4fejsn28f25ab53974',
        'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
        'accept': 'application/json',
        'useQueryString': true
    },
    "data": {
        "personalizations": [
            {
                "to": [
                    {"email":"ajorgensen89@gmail.com"
                }
            ],
            "subject":"Hello World!"
        }
    ],
    "from": {
        "email": "from_address@example.com"
    },
    "content": [
        {
            "type": "text/plain",
            "value":"Hello, World!"
        }
    ]
}
}
// .then((r)=>{
//     console.log(r.status, r.statustext, r.headers)
// })
// .catch((error)=>{
//     console.log(error)
// })

axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    })

