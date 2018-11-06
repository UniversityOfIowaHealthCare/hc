#!/usr/bin/env node

const program = require('commander');
const childProcess = require('child_process');

program
    .version('0.0.1', '-v, --version')
    .command('tag <realease-number> <name>')
    .action((releaseNumber, name) => {
        const tagName = `${new Date().toISOString().slice(0, 10)}.${releaseNumber}.${name.replace(/\s+/g, '_').toLowerCase()}`;
        console.log('Creating a git tag called ' + tagName);

        childProcess.exec(' git tag ' + tagName, (err, stdout) => {
            if (err) {
                return console.log("\x1b[31m%s\x1b[0m", err.message)
            }
            console.log(stdout);
        })
    });

// error on unknown commands
program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);
