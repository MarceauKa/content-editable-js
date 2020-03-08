export default class Recorder {
    constructor(app) {
        this.app = app;
    }

    save(changed, endpoint = null) {
        this.app.debug('Recorder saving', changed);
        endpoint = endpoint || this.app.config.defaultEndpoint;

        let request = new Request(endpoint, {
            method: 'POST',
            headers: {
                ...{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                ...this.app.config.headers
            },
            body: JSON.stringify(changed),
        });

        fetch(request)
            .then((response) => {
                response.json().then(response => this.app.debug('Recorder response', response));
            })
            .catch((error) => {
                error.json().then(response => this.app.debug('Recorder error', response));
            })
    }
}
