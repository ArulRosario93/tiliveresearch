export class SectionDescription {
    constructor(sectionContent, sectionImage) {
        this.sectionContent = sectionContent;
        this.sectionImage = sectionImage;
    }
}

export class Sections {
    constructor(sectionTitle, sectionDescription){
        this.sectionTitle = sectionTitle;
        this.sectionDescription = sectionDescription;
    }
}

export class Content {
    constructor(sections){
        this.sections = sections;
    }

}

class Report {
    
    constructor(pagesLength, publishedOn, reportCode, content) {
        this.pagesLength = pagesLength;
        this.publishedOn = publishedOn;
        this.reportCode = reportCode;
        this.content = content;
    }

}


export default Report;