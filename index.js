const koa = require("koa");
const app = koa();

app.use(function *(next) {
    this.body = "Hello, world!";
    yield next;
});

const port = process.env.PORT || 3000;
console.log(`Server listening on port ${port}`);
app.listen(port);
