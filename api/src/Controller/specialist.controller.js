const pool = require ("../db/db.client");

class SpecialistController {
    //CREATE
    async createSpecialist(req, res) {
        const {
            surname,
            name,
            patronymic,
            avtorization,
            roles,
        } = req.body;
        try{
            const avtorizationResult = await pool.query (
                "INSERT INTO avtorizations (login, password) VALUES ($1, $2) RETURNING id",
                [
                    avtorization.login,
                    avtorization.password,
                ]
            );
            const id_avtorizations = avtorizationResult.rows[0].id;

            const rolesResult = await pool.query (
                "INSERT INTO roles (caption) VALUES ($1) RETURNING id",
                [
                    roles.caption,
                ]
            );
            const id_roles = rolesResult.rows[0].id;

            const new_specialist = await pool.query (
                "INSERT INTO specialist (surname, name, patronymic, id_avtorization, id_roles) VALUES ($1, $2, $3, $4, $5) RETURNING id",
                [
                    surname,
                    name,
                    patronymic,
                    id_avtorizations,
                    id_roles,
                ]
            );
        } catch (error) {
            req.status(500).json({error: error.message});
        }
    }
    //GET
    async getSpecialist (req, res) {
        try {
            const specialist = await pool.query ("SELECT s*, a.login, a.password, r.caption FROM specialist s LEFT JOIN avtorizations a ON s.id_avtorization = a.id LEFT JOIN roles r ON s.id_roles = r.id");
            res.json(specialist.rows);
        } catch (err) {
            res.status(500).json({error:err.message});
        }
    }
    //UPDATE
    async updateSpecialist(req, res) {
        const {
            surname,
            name,
            patronymic,
            avtorization,
            roles,
        } = req.body;
        const id = req.params.id;
        const id_avtorizations = avtorizations.id;
        const id_roles = roles.id;
        try{
            await pool.query (
                "UPDATE avtorizations SET login=$1, password=$2 WHERE id=$3",
                [
                    avtorization.login,
                    avtorization.password,
                    id_avtorizations
                ]
            );

            await pool.query (
                "UPDATE roles SET caption=$1 WHERE id=$2",
                [
                    roles.caption,
                    id_roles
                ]
            );

            const specialist = await pool.query (
                "UPDATE specialist SET surname=$1, name=$2, patronymic=$3, id_avtorization=$4, id_roles=$5) WHERE id=$6",
                [
                    surname,
                    name,
                    patronymic,
                    id_avtorizations,
                    id_roles,
                    id,
                ]
            );
        } catch (error) {
            req.status(500).json({error: error.message});
        }
    }
    //DELETE 
    async deleteSpecialist (req, res) {
        const id = req.params.id;
        try {
            const specialistResult = await pool.query (
                "UPDATE specialist WHERE id=$1",
                [id]
            );
            if (specialistResult.rowCount === 0){
                res.status(404).json({message: "Сотрудник не найден"})
            }
            await pool.query ("UPDATE avtorizations WHERE id = $1",
                [id_avtorizations]
            );
            await pool.query ("UPDATE roles WHERE id=$1",
                [id_roles]
            );
        } catch (err) {
            res.status(500).json({error:err.message});
        }
    }
}

module.exports = new SpecialistController();