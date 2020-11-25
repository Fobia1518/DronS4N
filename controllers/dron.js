const { deliveryFile } = require('../services/dron');

exports.deliveryFile = (req, res) => {
    try {
        const deliverys = deliveryFile(req, res);
        if(deliverys == false)
        {
            res.status(400).send({ 
                internal_code: "bad_request",
                message: "Deliverys must not exceed the limit of 3", 
            });
        }
        else {
            if(deliverys== 'delivery_404'){
                res.status(404).send({ internal_code: 404, message: "Delivery file NOT FOUND" });
            }
            else res.status(200).send({ "deliverys": deliverys });
        }
    } catch (error) {
        res.status(400).send({ 
            internal_code: "bad_request",
            message: error.message, 
        });
    }
}

