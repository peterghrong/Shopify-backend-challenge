import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Item from "../models/item";
import request from "supertest";
import express from "express";
import cors from "cors";
import itemsRouter from "../routes/items";

describe("/items tests", () => {
	let mongod;
	let app;
	let id;
	let item;

	beforeAll(async () => {
		app = express();
		app.use(cors());
		app.use(express.json());
		app.use(express.urlencoded());
		app.use(itemsRouter);
		mongod = await MongoMemoryServer.create();
		const uri = await mongod.getUri();
		await mongoose.connect(uri);
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongod.stop();
	});

	beforeEach(async () => {
		item = new Item({
			name: "test",
			description: "test",
			count: 1,
		});
		await item.save();
		id = item._id.valueOf();
	});

	afterEach(async () => {
		await Item.remove({});
	});

	it("should get items", async () => {
		const response = await request(app).get("/items");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			items: [
				expect.objectContaining({
					_id: id,
					name: "test",
					description: "test",
					count: 1,
				}),
			],
		});
	});

	it("should post items", async () => {
		const response = await request(app).post("/items").send({
			name: "new test",
			description: "new test",
			count: 2,
		});
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			item: expect.objectContaining({
				name: "new test",
				description: "new test",
				count: 2,
			}),
		});
	});

	it("should return errors on post", async () => {
		const response = await request(app).post("/items").send({
			name: "missing params",
			count: 2,
		});
		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			message: "Validation Error",
		});
		const secondResponse = await request(app).post("/items").send({
			name: "range error",
			description: "range error",
			count: -1,
		});
		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			message: "Validation Error",
		});
	});

	it("should update items", async () => {
		const response = await request(app).put(`/items/${id}`).send({
			name: "update test",
			description: "update test",
			count: 2,
		});
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			item: expect.objectContaining({
				_id: id,
				name: "update test",
				description: "update test",
				count: 2,
			}),
		});
	});

	it("should return errors on put", async () => {
		const response = await request(app).put(`/items/${id}`).send({
			name: "missing params",
			description: "missing params",
		});
		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			message: "Validation Error",
		});

		await item.remove();
		const secondResponse = await request(app).put(`/items/${id}`).send({
			name: "invalid id",
			description: "invalid id",
			count: 1,
		});
		expect(secondResponse.status).toBe(401);
		expect(secondResponse.body).toEqual({
			message: "Item not found",
		});
	});

	it("should delete items", async () => {
		const response = await request(app).delete(`/items/${id}`);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			item: expect.objectContaining({
				_id: id,
				name: "test",
				description: "test",
				count: 1,
			}),
		});
	});

	it("should return error on delete", async () => {
		await item.remove();
		const response = await request(app).delete(`/items/${id}`);
		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			message: "Item not found",
		});
	});

	it("should get blob data", async () => {
		const response = await request(app).get("/items/download");
		expect(response.status).toBe(200);
		expect(response.body).not.toBeNull();
		expect(response.body).toBeInstanceOf(Buffer);
	});
});
