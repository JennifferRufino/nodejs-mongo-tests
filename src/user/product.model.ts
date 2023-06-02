import { Document, Schema, model } from 'mongoose';

interface IPrice {
	size: string;
	price: number;
}

interface IProduct {
	name: string;
	varients: string[];
	prices: Array<Record<string, number>>;
	category: string;
	image: string;
	description: string;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			require,
		},
		varients: [],
		category: {
			type: String,
			require,
		},
		description: {
			type: String,
			require,
		},
		image: {
			type: String,
			require,
		},
		prices: [
			{
				type: Map,
				of: Number,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const ProductModel = model<IProductModel>('Product', ProductSchema);

export default ProductModel;
