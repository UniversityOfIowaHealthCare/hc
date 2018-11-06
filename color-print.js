/**
 * Colorizing function that can be used to color text in the terminal.
 */

const RED = "\x1b[31m%s";
const GREEN = "\x1b[32m%s";
const RESET_COLOR = "\x1b[0m";

function print(color, text) {
    return console.log(color + RESET_COLOR, text)
}

module.exports = {
    red: function (text) {
        return print(RED, text)
    },
    green: function (text) {
        return print(GREEN, text)
    }
};
