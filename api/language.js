export default function handler(req, res) {
    const acceptedLanguages = req.headers['accept-language'];

    if (acceptedLanguages) {
        if (acceptedLanguages.includes('de')) {
            res.redirect(301, '/de/');
        } else if (acceptedLanguages.includes('fr')) {
            res.redirect(301, '/fr/');
        } else if (acceptedLanguages.includes('en')) {
            res.redirect(301, '/en/');
        } else {
            res.redirect(301, '/en/');
        }
    } else {
        res.redirect(301, '/en/');
    }
}