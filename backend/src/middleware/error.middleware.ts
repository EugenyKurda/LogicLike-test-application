import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error.message);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error: CustomError = new Error(`Not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};