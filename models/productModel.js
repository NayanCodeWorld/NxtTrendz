import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    image_url: {
        type: String,
        required:true,
    },
    rating: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    availability: {
        type: Number,
        required:true
    },
}, {timestamp: true}
);

export default mongoose.model('products', productSchema);