import app from "./api/app";

const port = process.env.APP_PORT || 3001;

app.listen(port, ()=>{
    console.log(`listening on *:${port} \n link: http://localhost:${port}/`)
})