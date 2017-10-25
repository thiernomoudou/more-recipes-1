import recipes from './db';
/**
 * Temporary json store interactor for now
 */
export default class Database {
  /**
   * Initialize the database records
   */
  constructor() {
    this.recipes = recipes;
  }

  /**
   * Dummy persist a record to database
   * @param {object} recipe recipe to be saved to database
   * @returns {Promise} promise with recipe
   */
  save(recipe) {
    return new Promise((resolve, reject) => {
      if (this.error) {
        return reject(Error('The record could not be saved to the database.'));
      }

      recipe.createdAt = new Date();
      recipe.updatedAt = new Date();
      recipe.upvotes = 0;
      recipe.downvotes = 0;
      recipe.favorites = 0;
      recipe.ingredients = JSON.parse(recipe.ingredients);
      recipe.procedure = JSON.parse(recipe.procedure);
      //  this.recipes.push(recipe);
      return resolve(recipe);
    });
  }
}