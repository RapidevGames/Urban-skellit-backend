const SquareBaseURL = require('../apiConstrains/apiList');

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
        const itemData = response.data.object;
        res.json({ data: itemData });
    } catch (error) {
        console.error('Error fetching item information:', error?.response?.data || error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const ItemModifier =  async (req, res )=>{
    const modifierID = req.params.modifierID;

    try {
        const response = await SquareBaseURL.get(`/catalog/object/${modifierID}`);
        const itemData = response.data.object;
        res.json({ data: itemData });
    } catch (error) {
        console.error('Error fetching item information:', error?.response?.data || error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    PopularItems,
    ItemInformation,
    ItemModifier
};
