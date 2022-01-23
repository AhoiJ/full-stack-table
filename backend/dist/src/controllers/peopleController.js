"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.addPerson = exports.getPersonById = exports.getPeople = void 0;
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
const getPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbconnector_1.default.query('SELECT * FROM people_table ORDER BY id ASC');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.getPeople = getPeople;
const getPersonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield dbconnector_1.default.query('SELECT * FROM people_table WHERE id = $1', [id]);
    return res.json(response.rows);
});
exports.getPersonById = getPersonById;
const addPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fname, lname, age } = req.body;
    const response = yield dbconnector_1.default.query('INSERT INTO people_table (first_name, last_name, age) VALUES ($1, $2, $3)', [fname, lname, age]);
    res.json({
        message: 'Person Added successfully',
        body: {
            person: { fname, lname, age }
        }
    });
});
exports.addPerson = addPerson;
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { fname, lname, age } = req.body;
    const response = yield dbconnector_1.default.query('UPDATE people_table SET first_name = $1, last_name = $2, age = $3 WHERE id = $4', [
        fname,
        lname,
        age,
        id
    ]);
    res.json('Person Updated Successfully');
});
exports.updatePerson = updatePerson;
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield dbconnector_1.default.query('DELETE FROM people_table where id = $1', [
        id
    ]);
    res.json(`Person ${id} deleted Successfully`);
});
exports.deletePerson = deletePerson;
//# sourceMappingURL=peopleController.js.map