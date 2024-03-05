const express = require('express')
const app = express()
const port = 3000

function is_even(num) {
    // if (num <= 1) return false;
    // for (let i = 2; i <= Math.sqrt(num); i++) {
    //     if (num % i === 0) return false;
    // }
    // return true;
    return num % 2 == 0
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/iseven/:a', (req, res) => {
    try {
        let a = parseInt(req.params.a);
        if (isNaN(a)) {
            throw new Error('Invalid parameters');
        }
        const result = is_even(a);
        res.send((result).toString())
    }
    catch (error) {
        res.status(400).send('Bad Request');
    }
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = { is_even, server }