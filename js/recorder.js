class Recorder {
    constructor(driver) {
        this.driver = driver;
    }

    save(changed) {
        this.driver.save(changed)
    }
}

class LocalStorageRecorder {
    defaultConfig = {};

    constructor(config = {}) {
        this.config = Object.assign(this.defaultConfig, config);
    }

    save(changed) {
        console.log('LocalStorageRecorder save', changed);
    }
}

class HttpRecorder {
    defaultConfig = {
        endpoint: 'http://localhost'
    };

    constructor(config = {}) {
        this.config = Object.assign(this.defaultConfig, config);
    }

    save(changed) {
        console.log('HttpRecorder save', changed);

        let request = new Request(this.config.endpoint, {
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
