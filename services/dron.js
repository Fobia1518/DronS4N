const fs = require('fs');
const winston = require('winston');

exports.deliveryFile = (req, res) => {
  const item = req.body.dron;
  let dron = "";
  let path = ""
  if( item < 10 ){
    dron = "0" + item + ".txt"
  }
  else{
    dron = item + ".txt"
  }
  path = './delivery_files/in' + dron.toString();
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, {encoding:'utf8', flag:'r'}); 
    const split = data.split(/\r\n/);
    let deliverys = split.map((delivery, index) => { 
      return { "id": index, "delivery": delivery };
    });
    if(Object.keys(deliverys).length > 3){
        return false;
    }
    let angle = 0;
    let route = [];
    let vectorPos = [];
    let routes = [];
    for(let i=0; i < Object.keys(deliverys).length ; i++){
      angle = 0;
      route = deliverys[i].delivery.split('');
      for(let j=0; j < route.length ; j++)
      {
        switch (route[j]) {
          case 'A':
              vectorPos[j] = getPosition(angle);
            break;
          case 'I':
              if (angle == 0) {
                angle = 360 - 90;
                vectorPos[j] = getPosition(angle);
              }
              else{
                angle -= 90
                vectorPos[j] = getPosition(angle);
              }
            break;
          case 'D':
            if (angle == 360) {
              angle = 90;
              vectorPos[j] = getPosition(angle);
            }
            else{
              angle += 90
              if (angle == 360) {
                angle = 0;
                vectorPos[j] = getPosition(angle);
              }
              vectorPos[j] = getPosition(angle);
            }
            break;
        }
      }
      let xpos = 0, 
          ypos = 0, 
          xneg = 0, 
          yneg = 0, 
          maxX = 0, 
          maxY = 0,
          cardinal = '';
      for (let index = 0; index < vectorPos.length; index++) {
        if(vectorPos[index] == 'x'){
          xpos++;
        }
        if(vectorPos[index] == 'y'){
          ypos++;
        }
        if(vectorPos[index] == '-x'){
          xneg++;
        }
        if(vectorPos[index] == '-y'){
          yneg++;
        }
        if(xpos > xneg) maxX = xpos 
        else  maxX = xneg*(-1) ;

        if(ypos > yneg) maxY = ypos 
        else maxY = yneg*(-1);
      }

      if(maxX < 0 && maxY > 0){
        if(maxX > maxY) cardinal = 'Oeste'
        else  cardinal = 'Norte';
        routes[i] = [maxX, maxY, cardinal];
      }
      if(maxX > 0 && maxY > 0){
        if(maxX > maxY) cardinal = 'Oeste'
        else  cardinal = 'Norte';
        routes[i] = [maxX, maxY, cardinal];
      }
      if(maxX < 0 && maxY < 0){
        if(maxX > maxY) cardinal = 'Oeste'
        else  cardinal = 'Sur';
        routes[i] = [maxX, maxY, cardinal];
      }
      if(maxX > 0 && maxY < 0){
        if(maxX > maxY) cardinal = 'Este'
        else  cardinal = 'Sur';
        routes[i] = [maxX, maxY, cardinal];
      }
    }
    textDeliverys = `== Reporte de entregas == \n\n`;
    for (let index = 0; index < routes.length; index++) {
      textDeliverys += `(${routes[index][0]}, ${routes[index][1]}) direccion ${routes[index][2]} \n\n`;
    }
    fs.writeFile('./delivery_files/out' + dron.toString(), textDeliverys, (err)=>{
        if(err) throw err;
        winston.info('Created File');
    });
    return deliverys;
  }
  else{
    return "delivery_404";
  }
}

function getPosition(angle) {
  if (angle == 0) {
    return 'y';
  }
  if (angle == 90) {
    return 'x';
  }
  if (angle == 180) {
    return '-y';
  }
  if (angle == 270) {
    return '-x';
  }
}
