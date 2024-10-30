import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product.model'; 


export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: IProduct[] = await Product.find();
        res.status(200).json(products);
    } catch (error:any) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const product: IProduct | null = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error:any) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

export const addNewProduct = async (req: Request, res: Response): Promise<void> => {
    const { title, desc, price, brand, img } = req.body;

    try {
        const newProduct: IProduct = new Product({
            title,
            desc,
            price,
            brand,
            img,
        });
        const savedProduct: IProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error:any) {
        res.status(400).json({ message: 'Error adding product', error: error.message });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(id, updateData, {
            new: true, 
            runValidators: true, 
        });
        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json(updatedProduct);
    } catch (error:any) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};
