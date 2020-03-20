init()

function init() {
    let apiKey = 'ydvNHGQto4tLcOSZ4aWQ21b9AxTpwOpm'



    /**
     * 
     * @param {string} searchString 
     * @param {num} articleNum 
     * Fetches data from NYT API 
     * 
     */ 
    function doApiQuery(searchString, articleNum) {
        let queryString = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchString}&api-key=${apiKey}`


        $.ajax({
            url: queryString,
            method: 'GET'
        })
            .then(({response} = response) => {
                buildArticleUI(response.docs.slice(0, articleNum))
            })
            .catch((err) => {
                console.log('ERR', err)
            }) // #user-error
    }

    function buildArticleUI() {
        
    }

    doApiQuery('elections', 2)

}




