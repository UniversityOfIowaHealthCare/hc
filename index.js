#!/usr/bin/env node

const program = require('commander');
const childProcess = require('child_process');
const print = require('./color-print');


program
    .version('0.0.4', '-v, --version')
    .command('tag <release_number> <name>')
    .description('Create a git tag following the specified format: yyyy-mm-dd.<release number today>.awesome_and_descriptive_tag_name')
    .action(tag);

// Show an error on unknown commands
program.on('command:*', () => {
    const args = program.args.join(' ');

    error(`Invalid command: ${args}\nSee --help for a list of available commands.`)
});

function tag (releaseNumber, name) {
    if (isNaN(releaseNumber)) error('Release number must be a number');

    const
        formattedName = name.replace(/\s+/g, '_').toLowerCase(),
        formattedDate = formatDate(new Date()),
        tagName = `${formattedDate}.${releaseNumber}.${formattedName}`;

    childProcess.exec('git tag ' + tagName, (err, _) => {
        if (err) error(err.message);

        print.green(`Created git tag:\n${tagName}`);
        process.exit(0)
    })
}

// Format date string safely since the toISOString() function converts dates to UTC and may lose a day :/
function formatDate(date) {
    const year = date.getFullYear();
    let
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function error(message) {
    print.red('Error: ' + message);
    process.exit(1)
}

// If no command is specified, just show help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

program.parse(process.argv);
