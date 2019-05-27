export class API {
    constructor(url, key) {
        this.url = url;
        this.apiKey = key;
        this.endpoints = {}
    }
    createEntity(enity) {
        this.endpoints[enity] = this.createCRUDEndpoints(enity);
    }

    createCRUDEndpoints(name) {
        let endpoints = {}
        const resourceURL = `${this.url}/${name}`;
        endpoints.getAll = () => fetch(`${resourceURL}`, { headers: { 'apiKey': `${this.apiKey}` } })
            .then(res => res.json());

        endpoints.getById = (id) => fetch(`${resourceURL}?unique_id=${id}`, { headers: { 'apiKey': `${this.apiKey}` } }).then(res => res.json());
        return endpoints;
    }
}