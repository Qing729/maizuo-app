import Api from '../api'
import 'whatwg-fetch'
import { handleUrl } from '../util/handleUrl'
import { getTime } from '../util/handleTime'
import { getPrice } from '../util/handlePrice'

export function getBannerData(data) {
    let url = Api.BANNER_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                //得到了响应
                console.log('得到了响应');
                console.log(response);
                //接收数据
                return response.json();
            })
            .then(data => {
                let result = data.data.billboards?data.data.billboards.map(item => {
                    return {
                        img: item.imageUrl
                    }
                }):[]
                resolve(result);
            })
    })

}
export function getHotMovieData(data) {
    let url = Api.MOVIEDATA_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let result = data.data.films.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                        cinemaCount: item.cinemaCount,
                        watchCount: item.watchCount,
                        grade: item.grade,
                        img: item.cover.origin
                    }
                })
                resolve(result);
            })
    })
}
export function getUpcomMovieData(data) {
    let url = Api.MOVIEUPCOMDATA_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let result = data.data.films.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                        img: item.cover.origin,
                        time: getTime(item.premiereAt)
                    }
                })
                resolve(result);
            })
    })
}

export function getFilmDetail(id, data) {
    let url = Api.MOVIEDETAIL_URL + id + handleUrl(data);
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let item = data.data.film;
                let result ={
                        name: item.name,
                        director: item.director,
                        img: item.cover.origin,
                        time: getTime(item.premiereAt),
                        actors: item.actors.map(item=>{
                            return(item.name)
                        }).join(' | '),
                        nation: item.nation,
                        language: item.language?item.language:'',
                        category: item.category,
                        synopsis: item.synopsis
                }
                resolve(result);
            })
    })
}

export function getLocation(data) {
    let url = Api.LOCATIONDATA_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
            let cities = data.data.cities;
            let obj = {};
            cities.map(item=>{
                //取出首字母
                let letter = item.pinyin[0];
                //按首字母归类
                if(!obj[letter]){
                    obj[letter] = [];
                }
                obj[letter].push(item);
            })
            //将obj转arr
            let arr = [];
            for(let key in obj){
                arr.push({
                    letter: key,
                    value: obj[key]
                })
            }         
            // 对arr按字母排序
            for(let i = 0; i < arr.length; i++){
                let min = i;
                for(let j = i+1; j < arr.length; j++){
                    if(arr[i].letter>arr[j].letter){
                        let tmp;
                        tmp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = tmp;
                    }
                }
            }
            resolve(arr);              
        })
    })
}
export function getShoppingListData(){
    let url = Api.SHOPPINGLIST_URL;
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let menuArr = [];
                let bannerArr = [];
                let prefecture = [];
                let commodity = [];
                data.data.map(item=>{
                    if(item.type==1){
                        menuArr.push(item);
                    }else if(item.type==2){
                        bannerArr.push(item);
                    }else if(item.type==4){
                        prefecture.push(item)
                    }else if(item.type==5){
                        commodity.push(item)
                    }
                })
                let result = {
                    menu: menuArr,
                    banner: bannerArr,
                    prefecture,
                    commodity
                }
                resolve(result)
            })
    })
}

export function getShoppingGoods(data) {
    let url = Api.SHOPPINGGOODS_URL + handleUrl(data);
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
               let result = data.data.list.map(item=>{
                   return{
                    masterName: item.masterName,
                    id: item.id,
                    displaySalesCount: item.displaySalesCount,
                    defaultSkuId: item.defaultSkuId,
                    image: item.skuList[0].image,
                    price: getPrice(item.skuList[0].price)
                   }
               })
                resolve(result);
            })
    })
}
