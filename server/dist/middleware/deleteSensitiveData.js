const sensitiveData = ['__v', '_id', 'identifier', 'password', 'uuid'];
export function deleteSensitiveData(req, res, next) {
    console.log('deleteSensitiveData middleware');
    const originalJson = res.json;
    res.json = function (body) {
        if (body)
            deleteSensitivePropertiesRecursive(body);
        return originalJson.call(this, body);
    };
    next();
}
function deleteSensitivePropertiesRecursive(obj, processed = new Set()) {
    if (processed.has(obj)) {
        return; // Break recursion if object has already been processed
    }
    processed.add(obj);
    if (Array.isArray(obj)) {
        obj.forEach((item) => deleteSensitivePropertiesRecursive(item, processed));
    }
    else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                if (sensitiveData.includes(key))
                    delete obj[key];
                else
                    deleteSensitivePropertiesRecursive(obj[key], processed);
        }
    }
}
//# sourceMappingURL=deleteSensitiveData.js.map