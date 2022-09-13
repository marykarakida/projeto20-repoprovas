import { NextFunction, Request, Response } from 'express';

import schemas from '../schemas/schemas';

type SchemasTypes = keyof typeof schemas;

function validateSchema(schema: SchemasTypes) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schemas[schema].validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail: { message: string }) => detail.message);
            return res.status(422).send(errorMessages);
        }

        return next();
    };
}

export default validateSchema;
