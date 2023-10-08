import express from 'express';

// MIDDLEWARES
import { isAuthenticated, validationResult } from 'src/middlewares';

// CONTROLLERS
import {
	createStory,
	createStoryContent,
	getAllPublishedStories,
	getAllUserStories,
	getStory,
} from 'src/api/stories/stories.controller';

// VALIDATIONS
import { storiesValidateCreate, storiesValidateCreateContent } from 'src/api/stories/stories.validations';

export const storiesRouter = express.Router();

storiesRouter.post('/', isAuthenticated, storiesValidateCreate, validationResult, createStory);
storiesRouter.post('/content', isAuthenticated, storiesValidateCreateContent, validationResult, createStoryContent);

storiesRouter.get('/admin', isAuthenticated, getAllUserStories);
storiesRouter.get('/admin/:id', isAuthenticated, getStory);

storiesRouter.get('/web', isAuthenticated, getAllPublishedStories);
storiesRouter.get('/web/:id', isAuthenticated, getStory);
