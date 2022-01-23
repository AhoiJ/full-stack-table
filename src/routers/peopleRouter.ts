import express, { Router } from 'express';
import { getPersonById, getPeople, updatePerson, deletePerson, addPerson } from '../controllers/peopleController';
//import GetPerson from '../controllers/peopleController';

const router = Router();


router.get('/people', getPeople);
router.get('/people/:id', getPersonById)
router.post('/people', addPerson);
router.put('/people/:id', updatePerson)
router.delete('/people/:id', deletePerson);

export default router;