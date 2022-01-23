"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const peopleController_1 = require("../controllers/peopleController");
//import GetPerson from '../controllers/peopleController';
const router = (0, express_1.Router)();
router.get('/people', peopleController_1.getPeople);
router.get('/people/:id', peopleController_1.getPersonById);
router.post('/people', peopleController_1.addPerson);
router.put('/people/:id', peopleController_1.updatePerson);
router.delete('/people/:id', peopleController_1.deletePerson);
exports.default = router;
//# sourceMappingURL=peopleRouter.js.map