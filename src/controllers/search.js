const axios = require('axios');
const productSerializer = require('../serializers/product');

function getCategories(filters) {
  const categories = [];
  const categoriesValues = filters.find((filter) => filter.id === 'category').values;

  if (categoriesValues) {
    categoriesValues.forEach((category) => {
      if (category.path_from_root.length > 0) {
        category.path_from_root.forEach((cat) => {
          categories.push(cat.name);
        });
      }
    });
  }
  return categories;
}

async function searchItems(query) {
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    );
    const { results, filters } = response.data;

    const categories = getCategories(filters);
    const items = results.map((item) => productSerializer(item));
    return {
      authors: {
        name: 'Javier',
        lastname: 'Gonzalez',
      },
      categories: categories,
      items,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getItemById(id) {
  try {
    const [item, description] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`),
    ]);

    const itemData = item.data;

    return {
      authors: {
        name: 'Javier',
        lastname: 'Gonzalez',
      },
      item: productSerializer({...itemData, description: description.data.plain_text}),
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  searchItems,
  getItemById,
};
