const express = require('express')
const app = express()
const port = 6000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/is_prime/:a', (req, res) => {
    try {
        let a = parseInt(req.params.a);
        let is_prime = true
        if (isNaN(a)) {
            throw new Error('Invalid parameters');
        }

        if(a <= 0) is_prime = false
        if(is_prime) {
            for(let i=2;i<a;i++){
                if(a % i == 0){
                    is_prime = false
                    break
                }
            }
        }

        res.send((is_prime).toString());
    } catch (error) {
        res.status(400).send('Bad Request');
    }
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = server