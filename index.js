"use strict";

const koa = require("koa");
const app = koa();

app.use(function *(next) {
    const path = this.request.path

    let component;
    try {
        component = require("." + path);
    } catch (e) {
        component = () => `Could not find module at ${path}`;
    } finally {
        this.body = component();
        yield next;
    }
});

const port = process.env.PORT || 3000;
console.log(`Server listening on port ${port}`);
app.listen(port);
