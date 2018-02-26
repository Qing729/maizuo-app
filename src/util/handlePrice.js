export function getPrice(price){
    let pri = price/100;
    let result = pri.toFixed(2);
    return result;
}

export function getFilmPrice(price){
    let pri = price.toFixed(2);
    return pri;
}