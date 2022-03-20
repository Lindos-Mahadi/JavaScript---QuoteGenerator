// All Variable from HTML page
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loading = document.getElementById('loader');

// Show Loading
function showLoadingSpninner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function removeLoadingSpninner(){
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote(){

    showLoadingSpninner();

    const proxyApi = 'https://whispering-tor-04671.herokuapp.com/' // this line use for error removing
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyApi + apiUrl);
        const data = await response.json();

        // Reduce font size for long quotes
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = "Unkown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // Stop Loader, Show Quote
        removeLoadingSpninner()

    } catch (error) {
        // getQuote(); // Inspite of error, catch block will get new data
        console.log("sorry, No quote data", error);
    }
}

// Tweet Quote && Reload New Quote

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank'); // window will open a new window
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();