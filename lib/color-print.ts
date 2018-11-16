/**
 * Colorizing functions that can be used to color text in the terminal.
 */

const RED = "\x1b[31m%s";
const GREEN = "\x1b[32m%s";
const YELLOW = "\x1b[33m%s";
const RESET_COLOR = "\x1b[0m";

function print(color: string, text: string) {
	return console.log(color + RESET_COLOR, text)
}

export default {
	red: (text: string) => print(RED, text),
	green: (text: string) => print(GREEN, text),
	info: (text: string) => print(YELLOW, text)
};
