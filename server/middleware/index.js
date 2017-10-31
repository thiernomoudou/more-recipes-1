import api from './api';
import auth from './auth';
import authorize from './authorize';
import canUpvote from './can-upvote';
import canDownvote from './can-downvote';
import canFavorite from './can-favorite';
import createRecipeValidator from './create-recipe.validator';
import registerUserValidator from './register-user.validator';
import signinUserValidator from './signin-user.validator';

export default {
  api,
  auth,
  canUpvote,
  authorize,
  canDownvote,
  canFavorite,
  createRecipeValidator,
  registerUserValidator,
  signinUserValidator
};
