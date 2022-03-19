const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quote From API
async function getQuote(){
    
    const proxyApi = 'https://cors-anywhere.herokuapp.com/' // this line use for errro removing
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

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
        
    } catch (error) {
        getQuote(); // Inspite of error, catch block will get new data
        console.log("sorry, No quote data", error);
    }
}
// On Load
getQuote();