import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './../RecipeCard';
import recipePropType from '../../propTypes/recipe';

const RecipeRow = ({ recipes }) => (
  <div className="card-deck wow fadeIn">
    {recipes.map(recipe => (
      <div className="col-md-4 col-lg-4" key={recipe.id}>
        <RecipeCard recipe={recipe} />
      </div>
    ))}
  </div>
);

RecipeRow.propTypes = {
  recipes: PropTypes.arrayOf(recipePropType).isRequired
};

export default RecipeRow;
