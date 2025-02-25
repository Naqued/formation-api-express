"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCity = exports.cityValidationRules = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validate city parameter in query string
 * Checks if:
 * - city is present
 * - city is a string
 * - city contains only letters, spaces, and hyphens
 * - city is properly sanitized against XSS
 */
// Validation chain for city parameter
exports.cityValidationRules = [
    (0, express_validator_1.query)('city')
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
const validateCity = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array().map((err) => ({
                message: err.msg,
                param: err.param,
                value: err.value
            }))
        });
        return;
    }
    next();
};
exports.validateCity = validateCity;
