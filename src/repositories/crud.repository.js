const { Logger } = require("../config");

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
        try {
            const response = await this.model.destroy({
                where: {
                    id:data
                }
            })
            return response;
        } catch (error) {
            Logger.error("Something went wrong in CRUD Repo: delete")
            throw error;
        }
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