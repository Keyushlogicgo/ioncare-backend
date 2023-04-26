export const getFullDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + date.getMonth()).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`
}
export const getFullTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString()
}