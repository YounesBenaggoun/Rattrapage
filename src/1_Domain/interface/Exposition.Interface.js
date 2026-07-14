class IExposition {
    async add(_exposition) { throw new Error("ERROR : ADD Exposition NOT_IMPLEMENTED"); }
    async save(_exposition) { throw new Error("ERROR : Save Exposition NOT_IMPLEMENTED"); }
    async findById(_id){throw new Error("ERROR : Exposition.FindById Exposition NOT_IMPLEMENTED");}

}

export default IExposition;