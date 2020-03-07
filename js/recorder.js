class Recorder {
    constructor(defaultEndpoint) {
        this.defaultEndpoint = defaultEndpoint;
    }

    save(changed, endpoint = null) {
        console.log('HttpRecorder save', changed);
        endpoint = endpoint || this.defaultEndpoint;

        let request = new Request(endpoint, {
            method: 'POST',
            body: JSON.stringify(changed),
        });

        fetch(request)
            .then((response) => {
                console.log('HttpRecorder response', response);
            })
            .catch((error) => {
                console.log('HttpRecorder error', error);
            })
    }
}
