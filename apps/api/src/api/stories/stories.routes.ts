import express from 'express';

// MIDDLEWARES
import { isAuthenticated, validationResult } from 'src/middlewares';

// CONTROLLERS
import { createStory, createStoryContent } from 'src/api/stories/stories.controllers';

// VALIDATIONS
import { storiesValidateCreate, storiesValidateCreateContent } from 'src/api/stories/stories.validations';

export const storiesRouter = express.Router();

storiesRouter.post('/', isAuthenticated, storiesValidateCreate, validationResult, createStory);
storiesRouter.post('/content', isAuthenticated, storiesValidateCreateContent, validationResult, createStoryContent);
