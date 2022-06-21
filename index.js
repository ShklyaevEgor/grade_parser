var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');

var URL = 'table1.html';
var results = [];
var ocenka = 0;
const grade = []
var q = tress(function(url, callback){
    needle.get(url, function(err, res){
        if (err) throw err;

        // парсим DOM
        var $ = cheerio.load('<table class=".cabinet__table">...</table>');

        $('td').each(function(i,elem){
            grade[i] = $(this).text();
        });

        //информация о новости
        if($('<td>Отлично</td>')){
            ocenka+=5;
            results.push({
                /*title: $('h1').text(),
                date: $('.b_infopost>.date').text(),
                href: url,
                size: $('.newsbody').text().length*/
                asdfsd:ocenka,
                grade
            });
        }



        //список новостей
        $('.b_rewiev p>a').each(function() {
            q.push($(this).attr('href'));
        });

        //паджинатор
        $('.bpr_next>a').each(function() {
            // не забываем привести относительный адрес ссылки к абсолютному
            q.push(resolve(URL, $(this).attr('href')));
        });

        callback();
    });
}, 10); // запускаем 10 параллельных потоков

q.drain = function(){
    fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
}

q.push(URL);