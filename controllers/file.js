const fs = require('fs');

//crear funcion para tomar el archivo de acuerdo al numero de dron que envien
exports.readDeliveryFile = (req, res) => {
  const item = req.body.dron
  let dron = "";
  let path = ""
  if( item < 10 ){
    dron = "in0" + item + ".txt"
  }
  else{
    dron = "in" + item + ".txt"
  }
  path = './delivery_files/' + dron.toString();
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, {encoding:'utf8', flag:'r'}); 
    const split = data.split(/\r\n/);
    let deliverys = split.map((delivery, index) => { 
      return { "id": index, "delivery": delivery };
    });
    res.status(200).send({ "Deliverys": deliverys });
  }
  else{
    res.status(404).send({ "message": "Delivery file NOT FOUND", "internal_code": 404 });
  }
}