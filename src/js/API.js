export class API {
    constructor(url, key) {
        this.url = url;
        this.apiKey = key;
        this.endpoints = {}
    }
    static getInstance(url, key) {
        if (this.instance === undefined) {
            this.instance = new API(url, key);
        }
        return this.instance;
    }
    createEntity(enity) {
        this.endpoints[enity] = this.createCRUDEndpoints(enity);
    }

    createCRUDEndpoints(name) {
        let endpoints = {}
        const resourceURL = `${this.url}/${name}`;
        endpoints.getAll = () => fetch(`${resourceURL}?apikey=${this.apiKey}`)
            .then(res => res.json());

        endpoints.getById = async (id, uid_name) => {
            if (uid_name === undefined) uid_name = 'unique_id';
            const res = await fetch(`${resourceURL}?${uid_name}=${id}?apikey=${this.apiKey}`);
            return await res.json();
        }
        return endpoints;
    }
}