import Api from '../api'
import 'whatwg-fetch'
import { handleUrl } from '../util/handleUrl'
import { getTime, getDay } from '../util/handleTime'

export function getMovieData(data) {
    let url = Api.MOVIEDATA_URL + handleUrl(data);
    // console.log(url);
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let result = data.data.films.map(item=>{
                    return{
                        name: item.name,
                        id: item.id,
                        intro: item.intro,
                        cinemaCount: item.cinemaCount,
                        watchCount: item.watchCount,
                        grade: item.grade,
                        img: item.poster.origin
                    }
                })
                resolve(result);
            })
    })
}
export function getMovieSoonData(data) {
    let url = Api.MOVIESOONDATA_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let result = data.data.films.map(item=>{
                    return{
                        name: item.name,
                        id: item.id,
                        intro: item.intro,
                        img: item.poster.origin,
                        date: getTime(item.premiereAt),
                        week: getDay(item.premiereAt)
                    }
                })
                resolve(result);
            })
    })
}

export function getMovieTheatreData(data) {
    let url = Api.THEATRE_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let cinemas = data.data.cinemas;
                let obj = {};
                cinemas.map(item=>{
                    if(!obj[item.district.name]){
                        obj[item.district.name] = []
                    }
                    obj[item.district.name].push({
                        name: item.name,
                        address: item.address,
                        latitude: item.geocode.latitude,
                        longitude: item.geocode.longitude,
                        id: item.id,
                        labels: item.labels,
                    })
                })
                let arr = [];
                for(let key in obj){
                    arr.push({
                        name: key,
                        info: obj[key],
                        flag: false
                    })
                }
                resolve(arr);
            })
    })
}

export function getCinemaData(id, data) {
    let url = Api.CINEMA_URL + id + handleUrl(data);
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let cinema = data.data.cinema;
                let result = {
                    address: cinema.address,
                    id: cinema.id,
                    name: cinema.name,
                    telephones: cinema.telephones,
                    geocode: cinema.geocode,
                    services: cinema.services
               }
                resolve(result);
            })
    })
}

export function getCinemaBannerData(id, data) {
    let url = Api.CINEMABANNER_URL + id + '/film' + handleUrl(data);
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let filmList = data.data.filmList;
                let result = filmList?filmList.map(item=>{
                    return{
                        img: item.posterAddress,
                        name: item.filmName,
                        id: item.filmID
                    }
                }):[]      
                resolve(result);
            })
    })
}

export function getFilmTimeData(data) {
    let url = Api.CINEMATIME_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data=>{
                let schedules = data.data.schedules;
                let obj = {};
                schedules.map(item=>{
                    if(!obj[item.film.id]){
                        obj[item.film.id]=[]
                    }
                    obj[item.film.id].push(item);
                })
                let arr = [];
                for(let key in obj){
                    let subobj={};
                    let subarr=[];
                    obj[key].map(item=>{
                        if(!subobj[getTime(item.showAt)]){
                            subobj[getTime(item.showAt)]=[]
                        }
                        subobj[getTime(item.showAt)].push(item);
                    })
                    for(let time in subobj){
                        subarr.push({
                            time: time,
                            film: subobj[time],
                            isActive: 0  
                        })
                    }
                    arr.push({
                        id: key,
                        schedules: subarr,             
                    })
                }
                resolve(arr);
            })
    })
}