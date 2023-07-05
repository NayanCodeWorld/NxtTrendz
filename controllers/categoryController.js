import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(404).send({message: "Name is required"});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({message: "Category already exists"});
        }
        const category = await new categoryModel({name, slug: slugify(name)}).save();
        res.status(201).send({success: true, message: "new category created", category: category});
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category',
        });
    }
};

// Update category
export const updateCategoryController = async (req, res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            {name: name, slug : slugify(name)},
            {new: true}
        );
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category: category,
        });
    }catch(err){
            console.log(err);
            res.status(500).send({
            success: false,
            err,
            message: "Error While updating category",
        });
    }
};

//Get all categories
export const categoriesController = async (req, res) => {
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};

// Single category
export const singleCategoryController = async (req, res) => {
    try{
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category",
        });
    }
}

//Delete category
export const deleteCategoryController = async (req, res) => {
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true, message: "Category deleted successfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error,
        });
    }
};