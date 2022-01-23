import { QueryResult } from 'pg';
import { Request, Response } from 'express';
import pool from '../dbconfig/dbconnector';
/*
class PeopleController {

    public async get(req, res) {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM people_table";
            const { rows } = await client.query(sql);
            const people = rows;

            client.release();

            res.send(people);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}


export default PeopleController
*/

export const getPeople = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM people_table ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getPersonById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM people_table WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const addPerson = async (req: Request, res: Response) => {
    const { fname, lname, age } = req.body;
    const response = await pool.query('INSERT INTO people_table (first_name, last_name, age) VALUES ($1, $2, $3)', [fname, lname, age]);
    res.json({
        message: 'Person Added successfully',
        body: {
            user: { fname, lname, age }
        }
    })
};

export const updatePerson = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { fname, lname, age } = req.body;

    const response = await pool.query('UPDATE people_table SET first_name = $1, last_name = $2, age = $3 WHERE id = $4', [
        fname,
        lname,
        age,
        id
    ]);
    res.json('Person Updated Successfully');
};

export const deletePerson = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM people_table where id = $1', [
        id
    ]);
    res.json(`Person ${id} deleted Successfully`);
};