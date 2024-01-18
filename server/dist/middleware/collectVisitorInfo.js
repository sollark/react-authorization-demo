import VisitorModel from '../mongodb/models/visitor.model';
async function collectVisitorInfo(req, res, next) {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'] || '';
    const path = req.path;
    // Determine the device type
    let device = 'computer';
    if (/android/i.test(userAgent)) {
        device = 'android';
    }
    else if (/iphone|ipad/i.test(userAgent)) {
        device = 'iphone';
    }
    let visitor = await VisitorModel.findOne({ ip, userAgent });
    if (!visitor) {
        visitor = new VisitorModel({
            ip,
            userAgent,
            paths: [path],
            timestamps: [new Date()],
            device,
        });
    }
    else {
        visitor.paths.push(path);
        visitor.timestamps.push(new Date());
    }
    await visitor.save();
    next();
}
export default collectVisitorInfo;
//# sourceMappingURL=collectVisitorInfo.js.map