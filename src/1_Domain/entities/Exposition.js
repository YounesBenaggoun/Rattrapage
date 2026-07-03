class Exposition {
    constructor({
        id,
        title,
        adress,
        theme,
        description,
        maxVisitor,
        maxExposer,
        startTime,
        endTime,
    }) {
        this.id = id;
        this.title = title;
        this.adress = adress;
        this.theme = theme;
        this.description = description;
        this.maxVisitor = maxVisitor;
        this.maxExposer = maxExposer;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

module.exports = Exposition;