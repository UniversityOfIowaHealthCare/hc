/**
 * Colorizing functions that can be used to color text in the terminal.
 */

const RED = "\x1b[31m%s";
const GREEN = "\x1b[32m%s";
const RESET_COLOR = "\x1b[0m";

function print(color: string, text: string) {
    return console.log(color + RESET_COLOR, text)
}

export default {
    red: function (text: string) {
        return print(RED, text)
    },
    green: function (text: string) {
        return print(GREEN, text)
    }
};
