import { Request, Response, NextFunction } from 'express';

export const ipMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let clientIP = req.ip;

    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        if (Array.isArray(xForwardedFor)) {
            clientIP = xForwardedFor[0].split(',')[0].trim();
        } else {
            clientIP = xForwardedFor.split(',')[0].trim();
        }
    }

    if (clientIP && clientIP.substring(0, 7) === '::ffff:') {
        clientIP = clientIP.substring(7);
    }

    if (clientIP != null) {
        req.clientIP = clientIP;
    }
    next();
};

declare global {
    namespace Express {
        interface Request {
            clientIP: string;
        }
    }
}