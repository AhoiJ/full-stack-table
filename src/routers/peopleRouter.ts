import express, { Router } from 'express';
import PeopleController from '../controllers/peopleController';

const router = Router();
const peopleController = new PeopleController();

router.get('/', peopleController.get);

export default router;