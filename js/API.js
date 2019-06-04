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

        endpoints.getById = async (id, uid_name) => {
            if (uid_name === undefined) uid_name = 'unique_id';
            const res = await fetch(`${resourceURL}?${uid_name}=${id}`, { headers: { 'apiKey': `${this.apiKey}` } });
            return await res.json();
        }
        return endpoints;
    }
}