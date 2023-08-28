// MIDDLEWARES
import { isAuthenticated } from 'src/middlewares';

// ROUTES
import { userRouter } from 'src/api/users/user.routes';

// CONTROLLERS
import { createStory } from 'src/api/stories/stories.controllers';

userRouter.post('/', isAuthenticated, createStory);
