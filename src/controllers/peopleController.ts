
import pool from '../dbconfig/dbconnector';

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

export default PeopleController;