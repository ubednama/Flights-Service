const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app.error");

class CrudRepository {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        // console.log(data)
        try {
            const response = await this.model.create(data);
            return response;
        } catch(error) {
            Logger.error("Something went wrong in CRUD Repo: create");
            throw error;
        }
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id:data
            }
        })
        if(!response) throw new AppError('No record deleted as Data doesnt exists', StatusCodes.NOT_FOUND)
        return response;
    }

    async get(data) {
        const response = await this.model.findByPk(data)
        if(!response) {
            throw new AppError("Data doesnt exists", StatusCodes.NOT_FOUND)
        }
        return response;
    }


    async getAll(data) {
        try {
            const response = await this.model.findAll()
            return response;
        } catch (error) {
            Logger.error("Something went wrong in CRUD Repo: getAll")
        }
    }

    async update(id, data) {        //data => {col: value, ....}
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            })
        } catch (error) {
            Logger.error("Something went wrong in CRUD Repo: update")
        }
    }
}

module.exports = CrudRepository;