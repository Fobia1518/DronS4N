const fs = require('fs');

//crear funcion para tomar el archivo de acuerdo al numero de dron que envien
exports.readDeliveryFile = (_, res) => { 
    fs.readFile('./delivery_files/in01.txt', 'utf8' , (err, data) => {
        if (err) {
            res.status(400).send({ "error": err, "internal_code": 400 }); 
          return;
        }
        let split = data.split(/\r\n/);
        let deliverys = split.map((delivery, index) => { 
          return { "id": index, "delivery": delivery };
        });
        res.status(200).send({ "Deliverys": deliverys });
      })
}