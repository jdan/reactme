const React = require("react");
const ReactDOM = require("react-dom");
const componentModule = require(REQUIRE_PATH);

const Component = (componentModule["default"]) ?
    componentModule["default"] : componentModule;

const el = document.getElementById("main");

ReactDOM.render(<Component {...componentModule.props} />, el);
