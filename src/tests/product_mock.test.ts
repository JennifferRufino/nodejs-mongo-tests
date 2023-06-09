import supertest from 'supertest';
import mongoose from 'mongoose';
import * as ProductService from '../user/product.service';
import createServer from './../server';
import { CreateProductInput } from '../user/product.validation';

const app = createServer();

const createProductInput: CreateProductInput['body'] = {
	name: 'Test product',
	description: "Testing product's description",
	variants: ['small', 'medium', 'large'],
	category: 'nonveg',
	image: 'https://example.com/pepperoni.jpg',
	prices: [{ small: 10 }, { medium: 15 }, { large: 20 }],
};

const createProductResponse = {
	...createProductInput,
	_id: new mongoose.Types.ObjectId().toString(),
	createdAt: new Date().toString(),
	updatedAt: new Date().toString(),
};

describe('Service: Product', () => {
	/*
			? Create product scenarios
		*/
	describe('createProduct', () => {
		describe('given empty body', () => {
			it('should return a 400', async () => {
				const createProductServiceMock = jest
					.spyOn(ProductService, 'createProduct')
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValueOnce(createProductResponse);

				const { statusCode } = await supertest(app)
					.post('/api/products')
					.send({});

				expect(statusCode).toBe(400);
				expect(createProductServiceMock).not.toHaveBeenCalled();
			});
		});
		describe('given incomplete body - only name', () => {
			it('should return a 400', async () => {
				const createProductServiceMock = jest
					.spyOn(ProductService, 'createProduct')
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValueOnce(createProductResponse);

				const { statusCode } = await supertest(app)
					.post('/api/products')
					.send({ name: createProductInput.name });

				expect(statusCode).toBe(400);
				expect(createProductServiceMock).not.toHaveBeenCalled();
			});
		});
		describe('given incomplete body - only description', () => {
			it('should return a 400', async () => {
				const createProductServiceMock = jest
					.spyOn(ProductService, 'createProduct')
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValueOnce(createProductResponse);

				const { statusCode } = await supertest(app)
					.post('/api/products')
					.send({ description: createProductInput.description });

				expect(statusCode).toBe(400);
				expect(createProductServiceMock).not.toHaveBeenCalled();
			});
		});
		describe('given complete body', () => {
			it('should return a 200 and the product payload', async () => {
				const createProductServiceMock = jest
					.spyOn(ProductService, 'createProduct')
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValueOnce(createProductResponse);

				const { statusCode, body } = await supertest(app)
					.post('/api/products')
					.send(createProductInput);

				expect(statusCode).toBe(201);
				expect(body.product).toEqual(createProductResponse);

				expect(createProductServiceMock).toHaveBeenCalledWith(
					createProductInput
				);
			});
		});
	});
});
