export function getFormattedDate(date) {
    let newDate = new Date(date);
    
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let year = newDate.getFullYear().toString().slice(2);
    let hour = newDate.getHours();
    let adjustedHour = hour > 12 ? hour - 12 : hour;
    let minute = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
    let mm = hour < 12 ? 'am' : 'pm';

    return `${month}/${day}/${year} - ${adjustedHour}:${minute}${mm}`;
}
