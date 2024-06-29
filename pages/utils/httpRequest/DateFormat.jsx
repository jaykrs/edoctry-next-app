
let date = "2024-02-06T12:18:19.835Z";

export const DateFormat =  function (dateString) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = new Date(dateString);
    return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
}