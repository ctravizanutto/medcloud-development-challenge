import app, {init} from "./app.ts";

const port = 3000

init().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}.`)
    })
})