const rateLimit = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    requests: {},
};
// Cleanup mechanism
setInterval(() => {
    const now = Date.now();
    for (let ip in rateLimit.requests) {
        if (now - rateLimit.requests[ip].startTime > rateLimit.windowMs) {
            delete rateLimit.requests[ip];
        }
    }
}, rateLimit.windowMs);
function requestLimit(req, res, next) {
    const now = Date.now();
    const ip = req.ip;
    if (!rateLimit.requests[ip]) {
        rateLimit.requests[ip] = { count: 1, startTime: now };
    }
    else if (now - rateLimit.requests[ip].startTime > rateLimit.windowMs) {
        rateLimit.requests[ip] = { count: 1, startTime: now };
    }
    else if (rateLimit.requests[ip].count < rateLimit.max) {
        rateLimit.requests[ip].count++;
    }
    else {
        return res.status(429).send(rateLimit.message);
    }
    next();
}
export default requestLimit;
//# sourceMappingURL=requestLimit.js.map