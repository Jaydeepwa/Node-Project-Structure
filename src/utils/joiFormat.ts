import Joi from "joi";

export default {
    formatErrors(errors: Joi.ValidationErrorItem[]) {
        return errors.map((e) => {
            return {
                message: e.message,
            };
        });
    },
};
