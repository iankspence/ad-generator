export const createNameDateTime = (timeZone: string) => {
    let day = new Date().toLocaleString("en-US",{timeZone, hour12: false})
        .slice(0,10)
        .replace('/', '-')
        .replace('/', '-')
        .replace(',', '');

    if (day.split('-')[0].length < 2) {
        day = `0${day}`
    }

    if (day.split('-')[1].length < 2) {
        day = `${day.split('-')[0]}-0${day.split('-')[1]}-${day.split('-')[2]}`
    }

    let time = new Date().toLocaleString("en-US", {timeZone, hour12: false})
        .slice(11,19)
        .replace(' ', '')
        .replace('/', '-')

    if (time.split(':')[0].length < 2) {
        time = `0${time}`
    }

    return `${day}__${time}`
}
