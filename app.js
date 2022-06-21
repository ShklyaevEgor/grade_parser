const fs = require("fs");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");
const files = fs.readdirSync("customers");
let grade = [];
for (const file of files) {
    let customer = {};
    const html = fs.readFileSync(`customers/${file}`).toString();
    const $ = cheerio.load(html);
    cheerioTableparser($);   
    $('td').each(function(i,elem){
        if($(this).text()=='Отлично')
        grade.push(5);
        if($(this).text()=='Хорошо')
        grade.push(4);
        if ($(this).text()=='Удовлетворительно')
        grade.push(3);
    });
}
grade.push(5);
let sum=0;
grade.forEach(element => {
    sum+=element;
});
console.log(sum/grade.length)

fs.writeFileSync("customers.json", JSON.stringify(grade));