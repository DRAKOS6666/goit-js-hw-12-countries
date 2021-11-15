function fetchCountries(searchQuery) {
    return fetch(`
    http://api.countrylayer.com/v2/name/${searchQuery}?access_key=231611225b9d41928ad33480ce9fc4bb`).then(res => res.json());
}

export default fetchCountries;