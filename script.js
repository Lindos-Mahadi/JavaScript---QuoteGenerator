// Get Quote From API
async function getQuote(){
    
    const proxyApi = 'https://cors-anywhere.herokuapp.com/' // this line use for errro removing
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyApi + apiUrl);
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        getQuote();
        console.log("sorry, No quote data", error);
    }
}
// On Load
getQuote();