#!/usr/bin/env node
import * as program from 'yargs'

const version = require('../package.json').version

program
	.version('version', 'Show version number', version)
	.commandDir('./commands')
	.demandCommand(1, 'Please specify a command. See help output above')
	.strict()
	.help()
	.wrap(100)
	.argv
