export function getEndpoint() {
    if (window.location.origin.includes("localhost"))
        return "http://localhost:3900/api"
    else if (window.location.origin.includes("192.168"))
       return "http://192.168.43.1"
    else
        return "https://myvidlybackend14000231.herokuapp.com/api"
}