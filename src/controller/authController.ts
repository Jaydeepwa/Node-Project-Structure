import { IApiRequest } from "../types/core";
import { Response } from "express";
import { sendJsonResponse, StatusCodes, Message } from "../utils/apiResponse";
import { userSignUpValidation } from "../validation/authValidation";
import joiFormat from "../utils/joiFormat";
import { generateToken } from "../middleware/auth";

export const signInUser = async (req: IApiRequest, res: Response) => {
  try {
    /*
     #swagger.tags = ['user']
     #swagger.summary = 'This is the API  user signin'
     #swagger.produces = ['application/json']
     #swagger.responses[200] = {
       description: 'Service is running properly.',
     }
     #swagger.responses[500] = {
       description: 'Server error',
     }
     #swagger.responses[404] = {
       description: 'Not found',
     }
   */
    const token = generateToken({
      email: "test@gmail.com",
      _id: "6595315b23558201bca7af29",
    });

    return sendJsonResponse(res, StatusCodes.OK, { token: token }, true, Message.SIGNIN_SUCCESS);
  } catch (error) {
    return sendJsonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, [], false, error?.message);
  }
}

export const signUpUser = async (req: IApiRequest, res: Response) => {
  try {
    /*
     #swagger.tags = ['user']
     #swagger.summary = 'This is the API user signup'
     #swagger.produces = ['application/json']
     #swagger.responses[200] = {
       description: 'Service is running properly.',
     }
     #swagger.responses[500] = {
       description: 'Server error',
     }
     #swagger.responses[404] = {
       description: 'Not found',
     }
   */
    const bodyValidation = userSignUpValidation.validate(req.body, {
      abortEarly: false,
    });

    if (bodyValidation.error) {
      return sendJsonResponse(
        res,
        StatusCodes.BAD_REQUEST,
        [],
        false,
        Message.VALIDATION_FAILED,
        joiFormat.formatErrors(bodyValidation.error.details),
      );
    }

    return sendJsonResponse(res, StatusCodes.OK, [], true, Message.SIGNUP_SUCCESS);
  } catch (error) {
    return sendJsonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, [], false, error?.message);
  }
}

