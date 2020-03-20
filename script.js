

init()

function init() {
    let apiKey = 'ydvNHGQto4tLcOSZ4aWQ21b9AxTpwOpm'


    /**
     * 
     * @param {string} searchString 
     * @param {num} articleNum 
     * @param {num} startYear 
     * @param {num} endYear
     * options
     * {
     *  begin_date: YYYY,
     *  end_date: YYYY
     * 
     * }
     * Fetches data from NYT API 
     * 
     */ 
    function doApiQuery(searchString, articleNum, startYear, endYear) {
        let queryString = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchString}&api-key=${apiKey}`


        if (startYear) queryString = `${queryString}&begin_date=${startYear}0101`
        if (endYear) queryString = `${queryString}&end_date=${endYear}1230`


        $.ajax({
            url: queryString,
            method: 'GET'
        })
            .then(({response} = response) => {
                console.log(response.docs.slice(0, articleNum))
                buildArticleUI(response.docs.slice(0, articleNum))
            })
            .catch((err) => {
                console.log('ERR', err)
            }) // #user-error
    }

    /**
     * 
     * @param {object} data 
     * Builds then updates DOM with the built card elements
     */
    function buildArticleUI(data) {
        let cardEl = $('<article>')
        let cards = data.map(cardData => {
            let title = cardData.headline.main
            let byAuthor = cardData.byline.original
            let section = cardData.section_name
            let pubDate = cardData.pub_date
            let articleLink = cardData.web_url
            
        })
        console.log('[BUILDARTICLEIO][CARD DATA]', cards)
        // loop through {data} and build a card for each article
            // $(cardEl).addClass('class1 class2 ......')
            // TODO: Need classes that are getting added to each card
        
        // Append cardEl to body
            // TODO: #articles

        
    }

  doApiQuery('elections', 10, 2010, 2017)

}




