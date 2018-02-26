export function getTime(time){
    let _time = new Date(time);
    let month=_time.getMonth()+1;
    let date=_time.getDate();
    return month+'月'+date+'日'
}

export function getDay(time) {
    let _time=new Date(time);
    let day=_time.getDay();
    let weekArr=['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
    return weekArr[day]
}

export function getUnix(){
    let date = new Date();
    return date.getTime();
}

export function getShowTime(time){
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let reshours = Number(hours)<10?'0'+hours:hours;
    let resminutes = Number(minutes)<10?'0'+minutes:minutes;
    return reshours+':'+resminutes
}

export function getToday(){
    let _time = new Date();
    let month=_time.getMonth()+1;
    let date=_time.getDate();
    return month+'月'+date+'日'
}