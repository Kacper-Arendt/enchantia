import { body } from 'express-validator';

export const storiesValidateCreate = [
	body('name')
		.escape()
		.exists()
		.notEmpty()
		.withMessage('Name is required')
		.isString()
		.withMessage('Name should be string')
		.isLength({ min: 5 })
		.withMessage('Name should be at least 5 characters'),
];

export const storiesValidateCreateContent = [
	body('storyId').escape().exists().notEmpty().withMessage('storyId is required'),
	body('language').escape().exists().notEmpty().withMessage('language is required'),
	body('title')
		.escape()
		.exists()
		.notEmpty()
		.withMessage('title is required')
		.isString()
		.withMessage('title should be string')
		.isLength({ min: 5 })
		.withMessage('Title should be at least 5 characters'),
	body('content').escape().exists().notEmpty().withMessage('content is required'),
	body('description')
		.escape()
		.exists()
		.notEmpty()
		.withMessage('description is required')
		.isString()
		.withMessage('description should be string')
		.isLength({ min: 30, max: 300 })
		.withMessage('description should be at between 30 and 200 characters'),
];
