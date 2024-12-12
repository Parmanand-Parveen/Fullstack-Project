const productModel = require("../../models/product.model");

const fetchAllShoppingProduct = async (req, res) => {
  const { someparams } = req.query;
 
  let filter = {};
  let sortOption = {}; // To store sorting options
  
  if (someparams) {
    filter = {
      category: [],
      brand: []
    };

    someparams.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      if (key === "category") {
        filter.category.push(value);
      } else if (key === "brand") {
        filter.brand.push(value);
      } else if (key === "sort") {
        // Assuming the sort value could be something like "price:asc" or "price:desc"
        const [sortField, sortOrder] = value.split("=");
     if(sortField == "price%3Adsc"){
       sortOption = {price: -1}
      }else if(sortField == "price%3Aasc"){
        sortOption = { price: 1}
      }else if(sortField == "A+to+Z"){
        sortOption = { name: 1 }
      }else if(sortField == "Z+to+A"){
        sortOption = { name: -1 }
      }

    
        // sortOption[sortField] = sortOrder === "asc" ? 1 : -1;
      }
    });

    // Remove empty filters (e.g., if no categories or brands were specified)
    if (filter.category.length === 0) delete filter.category;
    if (filter.brand.length === 0) delete filter.brand;
  }
  console.log()
  try {
    // Create query based on filter, if no filter is applied, it will return all products
    const query = {};
    if (filter.category || filter.brand) {
      query.$or = [];
      if (filter.category) {
        query.$or.push({ category: { $in: filter.category } });
      }
      if (filter.brand) {
        query.$or.push({ brand: { $in: filter.brand } });
      }
    }
    console.log(sortOption)

    // Fetch products with optional sorting
    const products = await productModel.find(query).sort(sortOption);

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred" });
  }
};

module.exports = fetchAllShoppingProduct;
