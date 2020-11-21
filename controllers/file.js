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
    makeCartesianPlane(dron);
    res.status(200).send({ "Deliverys": deliverys });
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
    