const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let dataToSend
  let largeDataSet = []
  
  const python = spawn('python', ['script3.py'])

  
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...')
    largeDataSet.push(data)
  })

  
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    
    res.send(largeDataSet.join(''))
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
