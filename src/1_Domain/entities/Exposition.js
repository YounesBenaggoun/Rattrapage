class Exposition {
    constructor({
        id,
        title,
        adress,
        theme,
        description,
        maxVisitor,
        maxExposer,
        startDate,
        endDate,
    }) {
        this.id = id;
        this.title = title;
        this.adress = adress;
        this.theme = theme;
        this.description = description;
        this.maxVisitor = maxVisitor;
        this.maxExposer = maxExposer;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export default Exposition;