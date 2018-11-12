import {error, formatDate} from "../utils"
import * as childProcess from "child_process"
import print from "../color-print"


const tagOptions = {
    releaseNumber: {
        alias: 'r'
    },
    name: {
        alias: 'n'
    },
}

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
        childProcess.exec('git describe --tags', (err, tag) => {
            if (err) error(err.message)

            const
                todaysFormattedDate = formatDate(new Date()),
                todaysLatestReleaseRegex = new RegExp(todaysFormattedDate + /\.(\d+)\./.source),
                releaseMatch = tag.match(todaysLatestReleaseRegex),
                release = releaseMatch ? parseInt(releaseMatch[1]) + 1 : 0

            resolve(release)
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


exports.command = 'tag [releaseNumber] [name]'
exports.aliases = 't'
exports.describe = 'Create a git tag following the specified format: yyyy-mm-dd.<release number today>.awesome_and_descriptive_tag_name'
exports.builder = tagOptions
exports.handler = tag
