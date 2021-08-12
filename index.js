/**
 * 函数防抖 
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        let callNow = !timer
        timer = setTimeout(() => {
            timer = null;
        }, delay);
        if (callNow) fn.apply(this, args)
    }
};

/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, arguments);
            }, interval);
        } else {
            last = now;
            fn.apply(this, arguments);
        }
    }
}

/**
 * 下载方法
 * @param data 文件数据
 * @param fileName 文件名
 * @constructor
 */
export const publicDownload = (data, fileName) => {
    const blob = new Blob([data]);
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob, {
            type: 'text/plain'
        });
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}