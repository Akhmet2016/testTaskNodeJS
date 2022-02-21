const request = require('request');

const getAll = async (req, res) => {
    let brand = req.params.brand;
    try {
        let funcResult = await doRequest(brand, null);
        res.status(200).send(funcResult);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getByEngine = async (req, res) => {
    let brand = req.params.brand,
        engine = req.params.engine;
    try {
        let funcResult = await doRequest(brand, engine);
        res.status(200).send(funcResult);
    } catch (err) {
        res.status(500).send(err);
    }
}

function doRequest(brandOfCar, engineOfCar) {
    let brand = brandOfCar,
        engine = engineOfCar,
        url = 'https://st-drive.clickservice.com/v2/api/cars-test/',
        responseJSON = {},
        resultJSON = {},
        sortedByModificationJSON = {},
        typeOfEngine = {
            'Gasoline' : 'Бензин',
            'Diesel' : 'Дизель',
            'Gas' : 'Газ',
            'None' : 'Нет',
            'Other' : 'Прочие',
        },
        sortedByEngineJSON = {};
    brand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
    url = url + brand;
    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: url
        }, function (error, res, body) {
            if (!error && res.statusCode == 200 && body.length > 2) {
                responseJSON = JSON.parse(body);
                resultJSON = responseJSON.map(function (item) {
                    return {
                        brand: item.brand,
                        model: item.model,
                        modification: item.modification,
                        power: item.power,
                        engine: item.engine
                    }
                });
                function SortByModification(x, y){
                    if (x.modification < y.modification) return -1;
                    if (x.modification > y.modification) return 1;
                    return 0;
                }
                function SortByEngine(x, y){
                    if (x.engine < y.engine) return -1;
                    if (x.engine > y.engine) return 1;
                    return 0;
                }
                sortedByModificationJSON = resultJSON.sort(SortByModification);
                sortedByEngineJSON = sortedByModificationJSON.sort(SortByEngine);
                if (typeof engine != "undefined" && engine != null) {
                    if (typeof typeOfEngine[engine] == "undefined") {
                        reject('This type of engine does not exist in the manual');
                    } else {
                        const filteredByEngineJSON = sortedByEngineJSON.filter(item => {
                            if (item.engine == typeOfEngine[engine]) {
                                return item;
                            }
                        });
                        if (filteredByEngineJSON.length == 0) {
                            reject('There are no cars with this type of engine for this brand');
                        } else {
                            resolve(filteredByEngineJSON);
                        }
                    }
                } else {
                    resolve(sortedByEngineJSON);
                }
            } else if (body.length == 2) {
                reject('There are no such brands in the directory');
            } else {
                reject(error);
            }
        });
    });
}

module.exports = {
    getAll,
    getByEngine
};