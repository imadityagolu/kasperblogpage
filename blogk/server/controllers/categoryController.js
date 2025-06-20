const blogModel = require("../models/blogModel");
const slugify = require("slugify");
const categoryModel = require("../models/categoryModel");

//GET ALL category
exports.getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      categoryCount: category.length,
      message: "all categories",
      category,
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).send({
      success: false,
      message: "Not find category",
      error,
    });
  }
};

//add category
exports.addCategory = async (req, res) => {
  const { title } = req.body;
  const trimmedTitle = title.trim();
  try {
    if (title) {

        const existingCategory = await categoryModel.findOne({title: trimmedTitle});
    if (existingCategory) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }
      const slug = slugify(trimmedTitle.toLowerCase());
      const newcategory = new categoryModel({
        title: trimmedTitle,
        slug,
      });
      await newcategory.save();
      return res.status(201).send({
        success: true,
        message: "New category added",
        newcategory,
      });
    } else {
      return res
        .status(400)
        .json({ success: true, message: "all fields are required" });
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).send({
      success: false,
      message: "Cant add category",
      error,
    });
  }
};

//update category
exports.updateCategory = async (req,res)=> {
  const {id } = req.params;
  const {title} = req.body;

if (!title) {
  return res.status(400).json({success:false, message : "Title is required"});
}

 const trimmedTitle = title.trim();
  try {
     // Check if another category (other than the one being updated) has the same title
     const existingCategory = await categoryModel.findOne({
      title: trimmedTitle,
      _id:{$ne:id} // exclude the current category from the check
     });

     if(existingCategory){
      return res.status(409).json({success:false,message: "Category title already exists" });
     }

       // Generate slug from trimmed and lowercased title
       const slug = slugify(trimmedTitle.toLowerCase());

         // Find category by ID and update title and slug
         const updatedCategory = await categoryModel.findByIdAndUpdate(
          id,
          {title:trimmedTitle , slug},
          {new: true} //return updated
         );

         if(!updatedCategory){
          return res.status(404).json({success:false, message:"Category not found"});
         }
         return res.status(200).json({
          success:true,
            message: "Category updated successfully",
      updatedCategory,

         });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
        message: "Error updating category",
      error,
    });
    
  }
};


//delete category
exports.deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const categoriesdelete = await categoryModel.findOneAndDelete({_id: id});
    if (!categoriesdelete) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Categoried deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Categories Server Error ", error});
}
};



