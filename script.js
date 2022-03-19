const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loader
function getLoader(){
    loader.hidden = false; // dont show
    quoteContainer.hidden = true; // hide container
}

// Hide Loader
function completeLoader(){
    if (!loader.hidden) {
        quoteContainer.hidden = false; // show quote
        loader.hidden = true; // hide loader
    }
}

// Get Quote From API
async function getQuote(){
    
    completeLoader();

    const proxyApi = 'https://cors-anywhere.herokuapp.com/' // this line use for errro removing
    const apiUrl = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyApi + apiUrl);
        const data = await response.json();

        // If Quote Text long, Reduce font size for long quotes
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        // If Author is blank, add "Unknown"
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        
        // Stop Loader, Show Quote
        completeLoader();

    } catch (error) {
        getQuote(); // Inspite of error, catch block will get new data
        console.log("sorry, No quote data", error);
    }
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank'); // window will open a new window
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();