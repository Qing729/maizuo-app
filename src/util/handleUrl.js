export function handleUrl(data){
    let str = "?";
    for (let key in data) {
        str +=  key + "=" + data[key] + "&";
    }
    return str;
}