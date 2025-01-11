import React from 'react';

const Help = () => {
  return (
    <div className="help-container">
      <div className="help-header">
        <h1>Welcome to Instachef Help Center</h1>
        <p>Get the most out of our website by using the following tips and features:</p>
      </div>

      <div className="help-content">
        <div className="faq">
          <h3>How do I search for a recipe?</h3>
          <p>
            To search for a recipe, simply type the name of the dish, ingredients into the search bar. You can search for specific dishes, or try searching by ingredients you have at home.
          </p>
        </div>
        <div className="faq">
          <h3>How can I filter recipes by category?</h3>
          <p>
            You can filter recipes by category such as Breakfast, Starter, Vegan, Dessert and more. Just select the category in the filter section, and we’ll show recipes that match your preference.
          </p>
        </div>
        <div className="faq">
          <h3>How do I add a recipe to my favorites?</h3>
          <p>
            If you love a recipe and want to save it for later, click the heart icon on the recipe card. All your favorite recipes will be available in your favorite page.
          </p>
        </div>
        <div className="faq">
          <h3>Can I find recipes based on ingredients I have?</h3>
          <p>
            Yes! If you have ingredients at home and don't know what to cook, just type the ingredients into the search bar. We’ll show you recipes that include those ingredients.
          </p>
        </div>
        <div className="faq">
          <h3>What should I do if I can’t find a recipe?</h3>
          <p>
            If you can't find the recipe you're looking for, make sure to check your search keywords and try using different ingredient combinations. You can also contact support for additional help.
          </p>
        </div>
      </div>

      <div className="help-footer">
        <p>If you have any more questions, feel free to contact us at <a href="/">support@instachef.com</a></p>
      </div>
    </div>
  );
};

export default Help;
