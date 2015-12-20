'use strict';
const cheerio = require('cheerio');
const fs = require('fs');
const tarifHtml = './data/tarifs.html';
const tarifJson = './data/tarifs.json';

const $ = cheerio.load(fs.readFileSync(tarifHtml));

const placesDict = {
    'МОСКВА': 'Москва',
    'ШЕРЕМЕТЬЕВО 2': 'Шереметьево',
    'ЗЕЛЕНОГРАД': 'Зеленоград',
    'ММК СЕВЕР/ЮГ': 'Малое кольцо',
    'СОЛНЕЧНОГОРСК': 'Солнечногорск',
}
const daysDict = {
    'Понедельник': 1,
    'Вторник': 2,
    'Среда': 3,
    'Четверг': 4,
    'Пятница': 5,
    'Суббота': 6,
    'Воскресенье': 7
}

let tables = [];

$('table.tarif').each(function() {
    let direction = $('thead th[colspan]', this).text();
    direction = direction.split(' - ');
    let table = {
        'from': placesDict[direction[0]],
        'to': placesDict[direction[1]],
        'tarif': []
    };

    $('tbody tr.first td', this).slice(1).each(function() {
        let interval = $(this).text().split('-');
        table.tarif.push({
            'from': interval[0],
            'till': interval[1],
            'tarif': []
        });
    });
    $('tbody tr', this).not('.first').each(function() {
        let days = $('td', this).first().text().split(' - ');
        days = days.map((day) => {
            return daysDict[day];
        });
        let index = 0;
        $('td', this).slice(1).each(function() {
            let prices = $(this).text().split(' / ').map((price) => parseInt(price, 10));
            let colspan = $(this).attr('colspan') || 1;
            for (let i = 1; i <= colspan; i++) {
                table.tarif[index++].tarif.push({days, prices});
            };
        });
    });
    tables.push(table);
});

fs.writeFileSync(tarifJson, JSON.stringify(tables, null, '\t'));

