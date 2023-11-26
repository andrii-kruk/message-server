import {validateBody} from "../decorators/index.js";
import {auth} from "../schemas/index.js";

const signUpValidation = validateBody(auth.signUpSchema);
const signInValidation = validateBody(auth.signInSchema);

export default {
  signUpValidation,
  signInValidation,
};
