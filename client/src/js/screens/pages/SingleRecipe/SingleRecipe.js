import axios from 'axios';
import numeral from 'numeral';
import Gravatar from 'react-gravatar';
import React, { Component } from 'react';

import config from './../../../config';

import Reviews from './components/Reviews';
import NavBar from './../../components/Navbar';
import Footer from './../../components/Footer';
import SingleRecipeLoader from './../../components/SingleRecipeLoader';

export default class SingleRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
      reviews: [],
      loading: true 
    };

    this.loadReviews = this.loadReviews.bind(this);
  }
  /**
   * Fetch the recipe once the component is mounted.
   * 
   * @memberof SingleRecipe
   */
  async componentWillMount() {

    // Try to find the recipe in redux store.
    const indexOfRecipe = this.props.recipes.findIndex(recipe => recipe.id === this.props.params.id);
    // if its not there, fire an ajax request with axios.
    if (indexOfRecipe === -1) {
      try {
        const response = await axios.get(`${config.apiUrl}/recipes/${this.props.params.id}`);
        
        await this.props.updateRecipesInStore(response.data.data.recipe);

        this.loadReviews();
      } catch (error) {
        if (error.status === 404) {
          // if the recipe is not found from ajax request, redirect user to 404 page.
          
          console.log('recipe was not found.');
        }
  
        console.log(error.response);
      }
    }
  }
  /**
   * Get the paginated reviews for the recipe
   * 
   * @memberof SingleRecipe
   */
  async loadReviews() {
    try {
      const response = await this.props.getRecipeReviews(this.props.params.id); 
    } catch (error) {
      console.log('load reviews error:', error);
    }
  }
  

  render() {

    let recipeCard;
    let recipe;

    const indexOfRecipe = this.props.recipes.findIndex(recipe => recipe.id === this.props.params.id);

    if (indexOfRecipe === -1) {
      recipeCard = (
        <SingleRecipeLoader />
      );
    } else {
      recipe = this.props.recipes[indexOfRecipe];
    }

    

    let ingredients;

    if (recipe) {
      ingredients = JSON.parse(recipe.ingredients).map((ingredient, index) => {
        return (<li key={index} className="list-group-item">{ingredient}</li>);
      });
    }

    let procedure;

    if (recipe) {
      procedure = JSON.parse(recipe.procedure).map((step, index) => {
        return (
          <li key={index} className="list-group-item"><span className="badge badge-primary">{index + 1}</span>   {step}</li>
        );
      });
    }

    if (recipe) {
      recipeCard = (
        <div className="wow fadeIn card">
          <img className="card-img-top" style={{height: 450}} src={recipe.imageUrl} alt={recipe.title} />
          <div className="card-body">
            <h1 className="card-title text-center h4 mb-4">{recipe.title}
              <small className="text-muted" style={{fontSize: 15}}>   
                <i className="ion ion-clock ml-4 mr-1" />
                {recipe.timeToCook}
              </small>
            </h1>
            <p className="text-center my-4">
              {recipe.description}
            </p>
            <hr />
            <div className="media text-center mx-auto my-5" style={{width: 200}}>
              <Gravatar className="d-flex mr-3" 
                        email={recipe.User.email}
                        style={{width: 60, height: 60, borderRadius: '100%'}}/>
              <div className="media-body">
                <h5 className="mt-3">{recipe.User.name}</h5>
              </div>
            </div>
            <p className="text-muted h6 text-center my-4">
              <span className="mr-3 h3"><i className="ion ion-happy-outline" /> {numeral(recipe.upvotersIds.length).format('0a')} </span>
              <span className="mr-3 h3"><i className="ion ion-sad-outline" /> {numeral(recipe.downvotersIds.length).format('0a')} </span>
              <span className="mr-3 h3"><i className="ion ion-ios-heart" /> {numeral(recipe.favoritersIds.length).format('0a')}</span>
            </p>
            <hr />
            {/* Begin ingredients section */}
            <h3 className="mb-4 text-muted">Ingredients</h3>
            <ul className="list-group mt-3">
              {ingredients}
            </ul>
            <br/>
            {/* End ingredients section */}
            {/* Begin procedures section */}
            <h3 className="mb-4 mt-3 text-muted">Procedure</h3>
            <ul className="list-group my-3">
              {procedure}
            </ul>
            <br/>
            <h3 className="my-3 text-muted">Reviews</h3>
            {/* End procedures section */}
            {/* Reviews section */}
            <Reviews {...this.props} recipeReviews={this.props.reviews[this.props.params.id]}/>
            {/* End create review section */}
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavBar {...this.props}/>
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-8 col-xs-12 col-sm-12">
              {/* Begin card details */}
              {recipeCard}
              {/* End of card details  */}
            </div>
            <div className="col-lg-4 col-xs-12">
              <h3 className="text-center my-5">Similar recipes</h3>
              <div className="card mb-3">
                <div className="img-zoom">
                  <img className="card-img-top" style={{height: 200}} src="../../assets/img/meal-3.jpg" alt="Card image cap" />                
                </div>
                <div className="card-body">
                  <h6 className="card-title text-center">
                    <a href="single-recipe.html">Italian Pepperonni with mushroom coverings</a>
                  </h6>
                </div>
              </div>
              <div className="card mb-3">
                <div className="img-zoom">
                  <img className="card-img-top" style={{height: 200}} src="../../assets/img/meal-2.jpg" alt="Card image cap" />                
                </div>
                <div className="card-body">
                  <h6 className="card-title text-center">
                    <a href="single-recipe.html">Pressurized African Cassava Golden Grains</a>
                  </h6>
                </div>
              </div>
              <h3 className="text-center my-5">Top notch chefs</h3>
              <ul className="list-group">
                <li className="list-group-item"><span className="card-title">Kati Frantz</span></li>
                <li className="list-group-item"><span className="card-title">Irene Myers</span></li>
                <li className="list-group-item"><span className="card-title">Doctor Strange</span></li>
                <li className="list-group-item"><span className="card-title">Nadine Almendi F.</span></li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}
