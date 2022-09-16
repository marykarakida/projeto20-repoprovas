import Joi from 'joi';

export const newTestSchema = Joi.object({
    name: Joi.string().max(50).required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().strict().required(),
    disciplineId: Joi.number().strict().required(),
    teacherId: Joi.number().strict().required(),
});
