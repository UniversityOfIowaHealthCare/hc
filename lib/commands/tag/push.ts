import * as yargs from 'yargs'
import * as childProcess from "child_process"
import {error} from '../../utils'
import print from '../../color-print'
import * as Git from 'nodegit'

const hcPushOptions = () => {
	yargs
		.option('remote', {alias: 'r', default: 'origin'})
		.example('push', 'Push the latest tag to default remote origin.')
		.example('push -r github', 'Push the latest tag to a remote called "github".')
}

async function push(yargs: any) {
	const 
		remote = yargs.remote,
		repoDir = process.cwd(),
		repo = await Git.Repository.open(repoDir)

	fetchTagList(repo)
		.then(tags => tags.pop())
		.then(name => pushTag(remote, name))
		.then(name => getSuccessMessage(name, remote))
		.then(print.green)
		.catch(error)
}

async function fetchTagList(repo: Git.Repository) {
	return Git.Tag.list(repo)
}

async function pushTag(remote: string, tagName: string): Promise<string> {
	return new Promise<string>(function(resolve, _) {
		childProcess.exec(`git push ${remote} ${tagName}`, (err, _) => {
			if (err) error(err.message)

			resolve(tagName)
		})
	})
}

async function getSuccessMessage(name: string, remote: string): Promise<string> {
	return `Succesfully pushed ${name} to remote ${remote}.`
}

exports.command = 'push'
exports.aliases = 'p'
exports.describe = 'Push the most recently created git tag to origin (or to specified remote).'
exports.builder = hcPushOptions
exports.handler = push
