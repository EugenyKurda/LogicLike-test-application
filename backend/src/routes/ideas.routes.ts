import { Router } from 'express';
import { getIdeas, getIdeaById } from '../controllers/ideas.controller';
import { voteForIdea, getUserVotes } from '../controllers/votes.controller';

const router = Router();

router.get('/', getIdeas);
router.get('/:id', getIdeaById);

router.post('/:id/vote', voteForIdea);
router.get('/:id/votes/user', getUserVotes);

export default router;