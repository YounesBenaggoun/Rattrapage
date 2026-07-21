class Exposition {
    constructor({
        id,
        title,
        address,
        theme,
        duration,
        description,
        maxVisitor,
        maxExposer,
        startDate,
        endDate,
    }) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.theme = theme;
        this.duration = duration;
        this.description = description;
        this.maxVisitor = maxVisitor;
        this.maxExposer = maxExposer;
        this.startDate = startDate;
        this.endDate = endDate;
        this.validate();
    }
    validate() {
        this.validateDate();
    }
    validateDate() {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        if (start.getTime() >= end.getTime()) {
            throw new Error("Start Date est inferieur que End Date")
        }
    }
}
export default Exposition;