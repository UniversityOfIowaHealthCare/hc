#!/usr/bin/env node
import * as program from 'commander'
import {tag, unknown} from "./commands"

program
    .version('0.0.5', '-v, --version')
    .command('tag <release_number> <name>')
    .description('Create a git tag following the specified format: yyyy-mm-dd.<release number today>.awesome_and_descriptive_tag_name')
    .action(tag)

program.on('command:*', unknown)

const noCommandGiven = !process.argv.slice(2).length

if (noCommandGiven) program.outputHelp()

program.parse(process.argv)
