// Simulate a file uploading service which returns a promise
// Pass shouldFail = true to test fail scenarios
export default function uploadFile() {
    let interval;
    let timeout;

    function destroy() {
        clearInterval(interval);
        clearTimeout(timeout);
    }

    function upload(file, shouldFail) {
        return new Promise((resolve, reject) => {
            let progress = 0;
            const progressSteps = (Math.random() * (20 - 5)) + 5;
            const randomTime = (Math.random() * (5000 - 1000)) + 1000;
            const stepSize = randomTime / progressSteps;

            if (typeof this.onProgress === 'function') {
                interval = setInterval(() => {
                    progress += stepSize;
                    this.onProgress(progress / randomTime);
                }, stepSize);
            }

            timeout = setTimeout(() => {
                // Kill progress interval
                clearInterval(interval);

                if (shouldFail) {
                    return reject(new Error('Upload error! Sorry something went wrong, please try again'));
                }

                return resolve(file);
            }, randomTime);
        });
    }

    return {
        destroy,
        upload,
    };
}
