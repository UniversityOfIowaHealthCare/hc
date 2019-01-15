import {error, formatDate} from '../utils'
import * as childProcess from 'child_process'
import print from '../color-print'
import * as yargs from 'yargs'


async function tag(yargs: any) {
	const
		release = yargs.releaseNumber ? yargs.releaseNumber : await releaseNumber(),
		name = yargs.name ? yargs.name : await lastCommitMessage()

	return createTag(release, name)
}

function createTag(releaseNumber: number, name: string) {
	if (isNaN(releaseNumber)) error('Invalid arguments. See usage with --help')

	const
		formattedName = name.trim().replace(/\s+/g, '_').toLowerCase(),
		formattedDate = formatDate(new Date()),
		tagName = `${formattedDate}.${releaseNumber}.${formattedName}`

	childProcess.exec(`git tag -a ${tagName} -m ${tagName}`, (err, _) => {
		if (err) error(err.message)

		print.green(`\nCreated git tag:\n${tagName}`)
		process.exit(0)
	})
}

function releaseNumber(): Promise<number> {
	print.info('Grabbing up to date release number..')

	return new Promise((resolve, _) => {
		childProcess.exec('git tag -l', (err, list) => {
			if (err) error(err.message)

			if (!list) {
				print.info('No previous tags found. Using 0 as release number.')
				return resolve(0)
			}

			childProcess.exec('git describe --tags', (err, tag) => {
				if (err) error(err.message)

				const
					todaysFormattedDate = formatDate(new Date()),
					todaysLatestReleaseRegex = new RegExp(todaysFormattedDate + /\.(\d+)\./.source),
					releaseMatch = tag.match(todaysLatestReleaseRegex),
					release = releaseMatch ? parseInt(releaseMatch[1]) + 1 : 0

				return resolve(release)
			})
		})
	})
}

function lastCommitMessage(): Promise<string> {
	print.info('Fetching last commit message to use as tag name..')

	return new Promise<string>((resolve, _) => {
		childProcess.exec('git reflog -1 | sed \'s/^.*: //\'', (err, message) => {
			if (err) error(err.message)

			resolve(message)
		})
	})
}

const tagOptions = () => {
	yargs
		.commandDir('./tag')
		.option('releaseNumber', { alias: 'n' })
		.option('message', { alias: 'm' })
		.usage(usage)
		.example('hc tag', 'Let hc find the proper release number and message.')
		.example('hc tag -n 3', 'Specify just the release number.')
		.example('hc tag -m "Just a message"', 'Specify only the message.')
}

const usage =
`Create a git tag in the format of <date>.<release>.<message>

yyyy-mm-dd.<release number today>.awesome_tag_message

You can omit the release number and/or message and hc will fill them in for you. If you don't pass in a message, hc uses the last git commit message (note that hc will only use the first commit message that was specified with the -m option). To figure out the release number, hc will either increment today's latest tag's release number or use 0 if there are no tags today.`

exports.command = 'tag [releaseNumber] [message]'
exports.aliases = 't'
exports.describe = 'Create a git tag following the specified format:\n\nyyyy-mm-dd.<release number today>.awesome_tag_message'
exports.builder = tagOptions
exports.handler = tag
