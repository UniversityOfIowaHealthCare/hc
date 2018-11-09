import print from "./color-print"


// Format date string safely since the toISOString() function converts dates to UTC and may therefore lose a day :/
export function formatDate(date: Date) {
    const year = date.getFullYear()
    let
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}

export function error(message: string) {
    print.red('Error: ' + message)
    process.exit(1)
}
