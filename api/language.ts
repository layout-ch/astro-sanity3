import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse): void {
    const acceptedLanguages = req.headers['accept-language'];

    if (acceptedLanguages) {
        if (typeof acceptedLanguages === 'string') {
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
    } else {
        res.redirect(301, '/en/');
    }
}