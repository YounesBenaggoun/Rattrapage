class IExposition {
    async add(_exposition) { throw new Error("ERROR : ADD Exposition NOT_IMPLEMENTED"); }
    async save(_exposition) { throw new Error("ERROR : Save Exposition NOT_IMPLEMENTED"); }
    async findById(_id) { throw new Error("ERROR : Exposition.FindById Exposition NOT_IMPLEMENTED"); }
    async delete(_id){ throw new Error("Exposition.delete must be implemented") }
    async addExposerId(_expositionId, _exposerId){throw new Error("Exposition.addExposerId must be implemented")}
    async removeExposerId(_expositionId, _exposerId){throw new Error("Exposition.removeExposerId must be implemented")}
    async getAll(){throw new Error("Exposition.getAll must be implemented")}
    async findExpositionByExposerId(){throw new Error("Exposition.findExpositionByExposerId must be implemented")} 
}

export default IExposition;