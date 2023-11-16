const SquareBaseURL = require('../apiConstrains/apiList'); 

const ItemImage = async (imageId) => {
  try {
    const response = await SquareBaseURL.get(`/catalog/object/${imageId}`);
    
    const imageData = response.data.object.image_data;
    const imageUrl = imageData ? imageData.url : null;
    
    return imageUrl;
  } catch (error) {
    // console.error(error);
    return null;
  }
};

// Helper function to get category name based on category ID
function getCategoryName(categoryId, allObjects) {
  const category = allObjects.find(obj => obj.id === categoryId && obj.type === 'CATEGORY');
  return category ? category.category_data.name : null;
}

// const filterCatalogsByLocation = async (req, res) => {
//   const locationId = req.params.locationId;

//   try {
//     const response = await SquareBaseURL.get('/catalog/list');
// console.log(response.data.object);
//     const filteredCatalogs = response.data.objects.filter(item => {
//       const itemData = item.item_data || {};
//       const presentAtLocationIds = item.present_at_location_ids || [];
//       const presentAtAllLocations = item.present_at_all_locations === true;

//       // Additional check for category_id
//       const categoryId = itemData.category_id || null;

//       return (
//         (presentAtAllLocations || (presentAtLocationIds && presentAtLocationIds.includes(locationId))) &&
//         categoryId // Check if categoryId is truthy
//       );
//     });

//     // Create an array to store category objects
//     const categories = [];

//     // Populate the array with items grouped by category
//     for (const item of filteredCatalogs) {
//       const categoryId = item.item_data.category_id;
//       const categoryName = getCategoryName(categoryId, response.data.objects);

//       // Check if the category is already in the array
//       const existingCategory = categories.find(cat => cat.categoryId === categoryId);

//       if (!existingCategory) {
//         categories.push({
//           categoryId,
//           categoryName,
//           items: [],
//         });
//       }

//       // Extract price, image, and rating information
//       const price = item.item_data.variations &&
//         item.item_data.variations.length > 0 &&
//         item.item_data.variations[0].item_variation_data &&
//         item.item_data.variations[0].item_variation_data.price_money &&
//         item.item_data.variations[0].item_variation_data.price_money.amount
//         ? item.item_data.variations[0].item_variation_data.price_money.amount
//         : null;

//       const imageId = item.item_data.image_ids ? item.item_data.image_ids[0] : null;

//       const rating = item.item_data.rating ? item.item_data.rating : null;

//       // Fetch the image URL using the ItemImage function
//       const imageUrl = await ItemImage(imageId);
//       // Find the category in the array and push the item with image URL
//       const ecomImageUris = item.item_data.ecom_image_uris || null;
//       const categoryToUpdate = categories.find(cat => cat.categoryId === categoryId);
//       categoryToUpdate.items.push({
//         itemId: item.id,
//         itemName: item.item_data.name,
//         price,
//         imageId,
//         imageUrl, // Include the image URL in the item details
//         rating,
//         ecomImageUris 
//         // Add other item details as needed
//       });
//     }

//     res.json(categories);
//   } catch (error) {
//     // console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const filterCatalogsByLocation = async (req, res) => {
  const locationId = req.params.locationId;

  try {
    const response = await SquareBaseURL.get('/catalog/list');
    

    const filteredCatalogs = response.data.objects.filter(item => {
      const itemData = item.item_data || {};
      const presentAtLocationIds = item.present_at_location_ids || [];
      const presentAtAllLocations = item.present_at_all_locations === true;
      const categoryId = itemData.category_id || null;

      return (
        (presentAtAllLocations || (presentAtLocationIds && presentAtLocationIds.includes(locationId))) &&
        categoryId
      );
    });

    const categories = [];

    for (const item of filteredCatalogs) {
      const categoryId = item.item_data.category_id;
      const categoryName = getCategoryName(categoryId, response.data.objects);

      const existingCategory = categories.find(cat => cat.categoryId === categoryId);

      if (!existingCategory) {
        categories.push({
          categoryId,
          categoryName,
          items: [],
        });
      }

      const price = item.item_data.variations &&
        item.item_data.variations.length > 0 &&
        item.item_data.variations[0].item_variation_data &&
        item.item_data.variations[0].item_variation_data.price_money &&
        item.item_data.variations[0].item_variation_data.price_money.amount
        ? item.item_data.variations[0].item_variation_data.price_money.amount
        : null;

      const imageId = item.item_data.image_ids ? item.item_data.image_ids[0] : null;

      const ecomImageUris = item.item_data.ecom_image_uris || null;

      const rating = item.item_data.rating ? item.item_data.rating : null;

      const categoryToUpdate = categories.find(cat => cat.categoryId === categoryId);
      categoryToUpdate.items.push({
        itemId: item.id,
        itemName: item.item_data.name,
        price,
        imageId,
        ecomImageUris, // Include the ecom_image_uris in the item details
        rating,
        // Add other item details as needed
      });
    }

    res.json(categories);
  } catch (error) {
    console.error('Error fetching catalog data:', error.response.data);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






module.exports = {
  filterCatalogsByLocation,
};

