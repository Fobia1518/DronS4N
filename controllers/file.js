const fs = require('fs');

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
    // makeCartesianPlane(dron);
    /**
     * console.log(Object.keys(deliverys).length);
     * contador de objetos de json
     */
    let angle = 0;
    let route = [];
    let vectorPos = [];
    let routes = [];
    let coordinates = [];
    for(let i=0; i < Object.keys(deliverys).length ; i++){
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
      routes[i]= vectorPos;
    }

    /** Coordenadas */
    let xpos, ypos, xneg, yneg, maxX, maxY = 0;
    for(let i=0; i < routes.length ; i++) {
      for(let j=0; j < routes[i].length ; j++) {
        console.log(routes[i]);
        if(routes[i][j] == 'x'){
          xpos++;
        }
        if(routes[i][j] == 'y'){
          ypos++;
        }
        if(routes[i][j] == '-x'){
          xneg++;
        }
        if(routes[i][j] == '-y'){
          yneg++;
        }
      }
      console.log(xpos, xneg, ypos, yneg);
      // if(xpos > xneg){ maxX = xpos }
      // else { maxX = xneg };

      // if(ypos > yneg){ maxY = ypos }
      // else maxY = yneg;

      // console.log(maxX, maxY);
    }
    
    res.status(200).send({ "deliverys": deliverys });
  }
  else{
    res.status(404).send({ "message": "Delivery file NOT FOUND", "internal_code": 404 });
  }
}

function makeCartesianPlane(dron){
  var html='';
  html +=`<html>
            <body>
            
            <canvas id="myCanvas" width="200" height="200"
            style="border:1px solid #d3d3d3;">
            Your browser does not support the canvas element.
            </canvas>
            
            <script>
            
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            ctx.moveTo(100,0);
            ctx.lineTo(100,200);
            ctx.moveTo(0,100);
            ctx.lineTo(200,100);
            ctx.fillStyle = "black";
            ctx.fillRect(67, 67, 6, 6);
            ctx.font = "14px Arial";
            ctx.fillText("(-3,3)",60,60);
            ctx.stroke();
            
            </script>
            
            </body>
            </html>`;

            fs.writeFile('./tracking/'+ dron +'.html', html, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
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