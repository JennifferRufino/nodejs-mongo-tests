import { z } from 'zod';

export const createProductValidation = z.object({
	body: z.object({
		name: z.string().nonempty('Name is required'),
		variants: z.array(z.string()).default([]),
		category: z.string().nonempty('Category is required'),
		description: z.string().nonempty('Description is required'),
		image: z.string().nonempty('Image is required'),
		prices: z.array(z.record(z.number())).default([]),
	}),
});

export const getProductValidation = z.object({
	params: z.object({
		id: z.string({ required_error: 'Id is required' }),
	}),
});

export const updateProductValidation = z.object({
	body: z.object({
		name: z.string().nonempty('Name is required'),
		variants: z.array(z.string()).default([]),
		category: z.string().nonempty('Category is required'),
		description: z.string().nonempty('Description is required'),
		image: z.string().nonempty('Image is required'),
		prices: z.array(z.record(z.number())).default([]),
	}),
	params: z.object({
		id: z.string({ required_error: 'Id is required' }),
	}),
});

export const deleteProductValidation = z.object({
	params: z.object({
		id: z.string({ required_error: 'id is required' }),
	}),
});

export type CreateProductInput = z.TypeOf<typeof createProductValidation>;

export type GetProductInput = z.TypeOf<typeof getProductValidation>;

export type UpdateProductInput = z.TypeOf<typeof updateProductValidation>;

export type DeleteProductInput = z.TypeOf<typeof deleteProductValidation>;
