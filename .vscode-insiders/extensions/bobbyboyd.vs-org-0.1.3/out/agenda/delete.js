"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
module.exports = function () {
    let config = vscode.workspace.getConfiguration("vsorg");
    let checkFolder = config.get("folderPath");
    let folder;
    let dateArray = [];
    let textArray = [];
    let datelessText;
    let getDate;
    let convertedDateArray = [];
    readFiles();
    function readFiles() {
        fs.readdir(setMainDir(), (items) => {
            let agendaFile = checkFolder + "\\agendas\\agenda.vsorg";
            //erase data in file
            fs.writeFileSync(agendaFile, "");
            //loop through all of the files in the directory
            for (let i = 0; i < items.length; i++) {
                //make sure its a vsorg file
                if (items[i].includes(".vsorg")) {
                    //check for SCHEDULED
                    let fileText = fs.readFileSync(setMainDir() + "\\" + items[i], "utf8");
                    if (fileText.includes("SCHEDULED")) {
                        let getTextBeforeScheduled = fileText.match(/.*SCHEDULED.*/g);
                        getTextBeforeScheduled.forEach(element => {
                            datelessText = element.match(/.*(?=.*SCHEDULED)/g);
                            textArray.push();
                            getDate = element.match(/\[(.*)\]/);
                            //get the day of the week
                            let d = new Date(getDate[1]).getDay();
                            let nameOfDay;
                            if (d === 0) {
                                nameOfDay = "Sunday";
                            }
                            else if (d === 1) {
                                nameOfDay = "Monday";
                            }
                            else if (d === 2) {
                                nameOfDay = "Tuesday";
                            }
                            else if (d === 3) {
                                nameOfDay = "Wednesday";
                            }
                            else if (d === 4) {
                                nameOfDay = "Thursday";
                            }
                            else if (d === 5) {
                                nameOfDay = "Friday";
                            }
                            else if (d === 6) {
                                nameOfDay = "Saturday";
                            }
                            convertedDateArray.push({
                                date: getDate[0] + "," + nameOfDay,
                                text: getTextBeforeScheduled
                            });
                            dateArray = convertedDateArray.map(function (item) {
                                return item.date, item.text;
                            });
                            console.log(dateArray);
                        });
                    }
                }
            }
        });
    }
};
+let;
dateArraySorted = dateArray.sort();
if (!fs.existsSync(checkFolder + "\\agendas")) {
    fs.mkdirSync(checkFolder + "\\agendas");
}
if (!fs.existsSync(agendaFile)) {
    //fs.appendFileSync(checkFolder + "\\agendas\\agenda.vsorg", "\n" + current_line.text);
}
else {
    //write the first date to the file
    for (let j = 0; j < dateArraySorted.length; j++) {
        let contents = fs.readFileSync(agendaFile, 'utf-8').split('\n');
        if (!contents[j].includes('⊙') || !contents[j].includes('⊘') || !contents[j].includes('⊖')) {
        }
        //if date isnt in agenda
        if (contents[j].includes(dateArraySorted[j])) {
            fs.appendFileSync(agendaFile, datelessText + "\n");
        }
        else {
            fs.appendFileSync(agendaFile, dateArraySorted[j] + '\n');
            fs.appendFileSync(agendaFile, datelessText + "\n");
        }
    }
    //organize new data 
}
//# sourceMappingURL=delete.js.map