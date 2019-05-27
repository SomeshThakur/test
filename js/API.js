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
        endpoints.getById = (uid_name = "unique_id", id) => fetch(`${resourceURL}`, { headers: { 'apiKey': `${this.apiKey}`, uid_name: id } });
        return endpoints;
    }
}