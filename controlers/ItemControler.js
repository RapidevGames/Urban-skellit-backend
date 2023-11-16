// catalogController.js
const SquareBaseURL = require('../apiConstrains/apiList');

// const ItemImage = async (imageId) => {
//     try {
//         const response = await SquareBaseURL.get(`/catalog/object/${imageId}`, );

//         const imageData = response.data?.object?.image_data;
//         const imageUrl = imageData ? imageData?.url : null;
//         console.log(response.data.object.image_data.url);
//         return { imageId, imageUrl };
//     } catch (error) {
//         console.error(error);
//         return { imageId, imageUrl: null };
//     }
// };

// const PopularItems = async (req, res) => {
//     const locationId = req.params.locationId;

//     try {
//         const response = await SquareBaseURL.get('/catalog/list', );

//         // Create an object to store the first item of each category
//         const firstItemsByCategory = {};

//         // Iterate through the catalog objects
//         for (const item of response.data.objects) {
//             if (item.type === 'CATEGORY') {
//                 // If the item is a category, find the first associated item for the given location
//                 const associatedItem = response.data.objects.find(subItem =>
//                     subItem.type === 'ITEM' &&
//                     subItem.item_data.category_id === item.id &&
//                     (subItem.present_at_location_ids && subItem.present_at_location_ids.includes(locationId) ||
//                         subItem.present_at_all_locations)
//                 );

//                 if (associatedItem) {
//                     const categoryId = item.id;
//                     const categoryName = item.category_data.name;

//                     if (!firstItemsByCategory[categoryId]) {
//                         firstItemsByCategory[categoryId] = {
//                             categoryId,
//                             categoryName,
//                             items: [],
//                         };
//                     }

//                     const variations = associatedItem.item_data.variations;

//                     const price = variations?.length > 0 &&
//                         variations[0].item_variation_data?.price_money?.amount || null;

//                     const imageId = associatedItem.item_data.image_ids ? associatedItem.item_data.image_ids[0] : null;

//                     // Fetch the image URL using the ItemImage function
//                     const { imageUrl } = await ItemImage(imageId);

//                     const rating = associatedItem.item_data.rating ? associatedItem.item_data.rating : null;

//                     // Add the associated item to the category
//                     firstItemsByCategory[categoryId].items.push({
//                         itemId: associatedItem.id,
//                         itemName: associatedItem.item_data.name,
//                         price,
//                         imageId,
//                         imageUrl,
//                         rating,
//                         // Add other item details as needed
//                     });
//                 }
//             }
//         }

//         // Convert the object values to an array for the final response
//         const firstItemsArray = Object.values(firstItemsByCategory);

//         res.json(firstItemsArray);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const PopularItems = async (req, res) => {
    const locationId = req.params.locationId;

    try {
        const response = await SquareBaseURL.get('/catalog/list');

        // Create an object to store the first item of each category
        const firstItemsByCategory = {};

        // Iterate through the catalog objects
        for (const item of response.data.objects) {
            if (item.type === 'CATEGORY') {
                // If the item is a category, find the first associated item for the given location
                const associatedItem = response.data.objects.find(subItem =>
                    subItem.type === 'ITEM' &&
                    subItem.item_data.category_id === item.id &&
                    (subItem.present_at_location_ids && subItem.present_at_location_ids.includes(locationId) ||
                        subItem.present_at_all_locations)
                );

                if (associatedItem) {
                    const categoryId = item.id;
                    const categoryName = item.category_data.name;

                    if (!firstItemsByCategory[categoryId]) {
                        firstItemsByCategory[categoryId] = {
                            categoryId,
                            categoryName,
                            items: [],
                        };
                    }

                    const variations = associatedItem.item_data.variations;

                    const price = variations?.length > 0 &&
                        variations[0].item_variation_data?.price_money?.amount || null;

                    const imageId = associatedItem.item_data.image_ids ? associatedItem.item_data.image_ids[0] : null;

                    // Fetch the image URL directly from the item data
                    const ecomImageUris = associatedItem.item_data.ecom_image_uris || [];

                    // Add the associated item to the category
                    firstItemsByCategory[categoryId].items.push({
                        itemId: associatedItem.id,
                        itemName: associatedItem.item_data.name,
                        price,
                        imageId,
                        imageUrl: ecomImageUris.length > 0 ? ecomImageUris[0] : null,
                        ecomImageUris,

                        // Add other item details as needed
                    });
                }
            }
        }

        // Convert the object values to an array for the final response
        const firstItemsArray = Object.values(firstItemsByCategory);

        res.json(firstItemsArray);
    } catch (error) {
        console.error('Error fetching popular items:', error?.response?.data || error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const ItemInformation = async (req, res) => {
    const itemId = req.params.itemId;

    try {
        const response = await SquareBaseURL.get(`/catalog/object/${itemId}`);

        const itemData = response.data.object.item_data;

        // Include the image URL in the response
        const responseData = {
            name: itemData.name,
            description: itemData.description,
            is_taxable: itemData.is_taxable,
            visibility: itemData.visibility,
            category_id: itemData.category_id,
            variations: itemData.variations,
            product_type: itemData.product_type,
            skip_modifier_screen: itemData.skip_modifier_screen,
            ecom_visibility: itemData.ecom_visibility,
            image_url: itemData.ecom_image_uris && itemData.ecom_image_uris.length > 0
                ? itemData.ecom_image_uris[0]
                : null, // Include the image URL here
            ecom_image_uris: itemData.ecom_image_uris,
            // Include other item details as needed
        };

        res.json({ data: responseData });
    } catch (error) {
        console.error('Error fetching item information:', error?.response?.data || error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  

module.exports = {
    PopularItems,
    ItemInformation
};
