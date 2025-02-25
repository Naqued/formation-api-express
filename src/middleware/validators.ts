import { query, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Validate city parameter in query string
 * Checks if:
 * - city is present
 * - city is a string
 * - city contains only letters, spaces, and hyphens
 * - city is properly sanitized against XSS
 */

// Validation chain for city parameter
export const cityValidationRules: ValidationChain[] = [
    query('city')
        .trim()
        .notEmpty()
        .withMessage('Le paramètre city est requis')
        .isString()
        .withMessage('Le paramètre city doit être une chaîne de caractères')
        .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
        .withMessage('Le nom de ville contient des caractères non valides')
        .escape()
];

// Middleware to handle validation errors
export const validateCity = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array().map((err: any) => ({
                message: err.msg,
                param: err.param,
                value: err.value
            }))
        });
        return;
    }
    next();
}; 