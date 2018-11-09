import {error, formatDate} from "./utils"
import * as childProcess from "child_process"
import print from "./color-print"
import * as program from "commander"



export function tag (releaseNumber: number, name: string) {
    if (isNaN(releaseNumber)) error('1st argument (release number) must be a number')

    const
        formattedName = name.replace(/\s+/g, '_').toLowerCase(),
        formattedDate = formatDate(new Date()),
        tagName = `${formattedDate}.${releaseNumber}.${formattedName}`

    childProcess.exec('git tag ' + tagName, (err, _) => {
        if (err) error(err.message)

        print.green(`Created git tag:\n${tagName}`)
        process.exit(0)
    })
}

export function unknown() {
    const args = program.args.join(' ')

    error(`Invalid command: ${args}\nSee --help for a list of available commands.`)
}
