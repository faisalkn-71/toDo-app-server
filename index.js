const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qmgeoto.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        console.log("DB connected")

        const taskCollection = client.db('toDo_app').collection('todo');


        app.get('/tasks', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
          })


        app.post('/task', async (req, res) => {
            const task = req.body;
            console.log(task);
            const result = await taskCollection.insertOne(task);
            res.send(result);
      
          })

    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('To Do App is running!')
})

app.listen(port, () => {
  console.log(`To Do app listening on port ${port}`)
})