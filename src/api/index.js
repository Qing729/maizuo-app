/*
获取banner数据的接口
__t=1517313049455
*/
const BANNER_URL = '/v4/api/billboard/home'

/*
获取首页数据
__t=1517362724837
page=1
count=5
https://m.maizuo.com/v4/api/film/now-playing
*/ 
const HOTMOVIEDATA_URL = '/v4/api/film/now-playing'

/*
__t=1517362724846
page=1
count=3
https://m.maizuo.com/v4/api/film/coming-soon?__t=1517362724846&page=1&count=3
*/ 
const MOVIEUPCOMDATA_URL = '/v4/api/film/coming-soon'

/*
page=1
count=7
https://m.maizuo.com/v4/api/film/now-playing?page=1&count=7
*/
const MOVIEDATA_URL = '/v4/api/film/now-playing'

/*
page=1
count=7
https://m.maizuo.com/v4/api/film/coming-soon?page=1&count=7
*/
const MOVIESOONDATA_URL = '/v4/api/film/coming-soon'

/*
__t=1517471729085
https://m.maizuo.com/v4/api/film/4057?__t=1517471729085
*/
const MOVIEDETAIL_URL = '/v4/api/film/'

/*
__t=1517489700879
https://m.maizuo.com/v4/api/city?__t=1517489700879
*/
const LOCATIONDATA_URL = '/v4/api/city'

/*
__t=1517554658643
https://m.maizuo.com/v4/api/cinema?__t=1517554658643
*/
const THEATRE_URL = '/v4/api/cinema'

/*
https://aura.maizuo.com/api/ad/list
*/
const SHOPPINGLIST_URL = '/api/ad/list'

/*
page=1
num=20
https://aura.maizuo.com/api/recommend/home?page=1&num=20
*/
const SHOPPINGGOODS_URL = '/api/recommend/home'

/*
__t=1517799817536
https://m.maizuo.com/v4/api/cinema/6599?__t=1517799817536
*/
const CINEMA_URL = '/v4/api/cinema/'

/*
__t=1517821906930
https://m.maizuo.com/v4/api/cinema/6599/film?__t=1517821906930
*/
const CINEMABANNER_URL = '/v4/api/cinema/'

/*
__t=1517834804715
film=0
cinema=480
https://m.maizuo.com/v4/api/schedule?__t=1517834804715&film=0&cinema=480
*/
const CINEMATIME_URL = '/v4/api/schedule'

export default {
    BANNER_URL,
    HOTMOVIEDATA_URL,
    MOVIEUPCOMDATA_URL,
    MOVIEDATA_URL,
    MOVIESOONDATA_URL,
    MOVIEDETAIL_URL,
    LOCATIONDATA_URL,
    THEATRE_URL,
    SHOPPINGLIST_URL,
    SHOPPINGGOODS_URL,
    CINEMA_URL,
    CINEMABANNER_URL,
    CINEMATIME_URL
}