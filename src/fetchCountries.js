function fetchCountries(searchQuery) {
    return fetch(`
    https://restcountries.eu/rest/v2/name/${searchQuery}`).then(res => res.json());
}

export default fetchCountries;