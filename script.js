

init()

function init() {
    // set up eventlisteners
    $('#search-form').on('click', handleFormSubmit)
    $('#clear-results').on('click', handleArticleClear)

    function handleArticleClear(event) {
        event.preventDefault()
        $("#articles").empty()
    }


    function handleFormSubmit(event) {
        $("#articles").empty()
        event.preventDefault()
        let searchTermEl = $('#searchTerm').val()
        let numberOfRecords = $('#numberRecords').val()
        let startYear = parseInt($('#startYear').val())
        let endYear = parseInt($('#endYear').val())

        if (searchTermEl) {
            doApiQuery(searchTermEl, numberOfRecords, startYear, endYear) 
        } else {
            $('#error').text('Please enter a search term.')

                setTimeout(clearError, 5000)

                function clearError() {
                    $('#error').text("")
                }
        }
    }


    let apiKey = 'ydvNHGQto4tLcOSZ4aWQ21b9AxTpwOpm'

    /**
     * @param {string} searchString 
     * @param {num} articleNum 
     * @param {num} startYear 
     * @param {num} endYear
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
                $('#error').text(err.statusText)

                setTimeout(clearError, 5000)

                function clearError() {
                    $('#error').text("")
                }

                console.log('ERR', err)
            }) // #user-error
    }

    /**
     * @param {object} data 
     * Builds then updates DOM with the built card elements
     */
    function buildArticleUI(data) {
        let articleCards = data.map((cardData, index) => {
            let articleWrapperEl = $('<article>')

            // set article classes
            articleWrapperEl.addClass('card p-2 mb-3')

            let header5El = $('<h5>')
            let header6El = $('<h6>')
            let pEl = $('<p>')
            let linkEl = $('<a>')
     
            let title = cardData.headline.main
            let byAuthor = cardData.byline.original
            let section = cardData.section_name
            let pubDate = moment(cardData.pub_date).format("MMM Do YYYY")
            let articleLink = cardData.web_url 

            articleWrapperEl.append(header5El.text(`${index + 1}. ${title}`))
            articleWrapperEl.append(header6El.text(byAuthor))
            articleWrapperEl.append(pEl.text(section).addClass('card-text m-0'))
            articleWrapperEl.append(pEl.text(pubDate).addClass('card-text m-0'))
            articleWrapperEl.append(linkEl.attr("href", articleLink).addClass('card-link').text(articleLink))

            return articleWrapperEl
        })

        $('#articles').append(articleCards)
    }


}




