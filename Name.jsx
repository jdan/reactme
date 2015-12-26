const React = require("react");

const style = {
    width: 200,
    borderRadius: 5,
    margin: "200px auto",
    padding: 80,

    background: "#333",
    color: "#fff",

    fontFamily: "Helvetica Neue",
    fontSize: 30,
    textAlign: "center",
};

export default (props) => {
    return <div style={style}>
        Hello, {props.name}!
    </div>;
};

export const props = {
    name: "@jdan",
};
