/**
 * This middleware for express forces the use of https
 */

 export default function force_https(req, res, next) {
    //If deployed on heroku use https otherwise skip
    if(process.env.PORT) {
        if(req.headers['x-forwarded-proto'] !== "https") {
            return res.redirect(`https://${req.headers.host}${req.url}`);
        } else {
            return next();
        }
    }
 }