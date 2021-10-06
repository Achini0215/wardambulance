const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db.js');
const wardRoutes = express.Router();
const ambulanceRoutes = express.Router();
const PORT = 4000;

let Ward = require('./ward');
let Ambulance = require('./ambulance');
const ambulance = require('./ambulance');

app.use(cors());
app.use(bodyParser.json());

// Ward Functions Implementation

wardRoutes.route('/').get(function(req, res) {
    Ward.find(function(err, ward) {
        if(err) {
            console.log(err);
        }else {
            res.json(ward);
        }
    });
});

wardRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Ward.findById(id, function(err, ward) {
        res.json(ward);
    });
});

wardRoutes.route('/update/:id').post(function(req, res) {
    Ward.findById(req.params.id, function(err, ward) {
    if(!ward)
        res.status(404).send("Data is not found");
    else
    ward.wardName = req.body.wardName,
    ward.building = req.body.building,
    ward.floor = req.body.floor,
    ward.regDate = req.body.regDate,
    ward.wardNum = req.body.wardNum,
    ward.discharge = req.body.discharge,
    ward.disDate = req.body.disDate,
    ward.availableRoom = req.body.availableRoom,
    ward.roomCategory = req.body.roomCategory,
    ward.roomNum = req.body.roomNum,
    ward.bedNumber = req.body.bedNumber

    ward.save().then(ward => {
        res.json('Ward Updated!');
    })
    .catch(err => {
        res.status(400).send("Update not possible");
    });
})
})

wardRoutes.route('/add').post(function(req, res) {
    let ward = new Ward(req.body);
    ward.save()
    .then(ward => {
        res.status(200).json({'ward': 'ward added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new ward failed');
    });
});

wardRoutes.route('/:id').delete(function(req, res) {
    Ward.findById(req.params.id)
    .then(ward => ward.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false}));
});

// Ambulance Functions Implementation

ambulanceRoutes.route('/').get(function(req, res) {
    Ambulance.find(function(err, ambulance) {
        if(err) {
            console.log(err);
        }else {
            res.json(ambulance);
        }
    });
});

ambulanceRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Ambulance.findById(id, function(err, ambulance) {
        res.json(ambulance);
    });
});

ambulanceRoutes.route('/update/:id').post(function(req, res) {
    Ambulance.findById(req.params.id, function(err, ambulance) {
    if(!ambulance)
        res.status(404).send("Data is not found");
    else
    ambulance.plate = req.body.plate,
    ambulance.driver = req.body.driver,
    ambulance.dob = req.body.dob,
    ambulance.phone = req.body.phone,
    ambulance.available = req.body.available,
    ambulance.travelTime = req.body.travelTime,

    ambulance.save().then(ambulance => {
        res.json('Ambulance Updated!');
    })
    .catch(err => {
        res.status(400).send("Update not possible");
    });
})
})

ambulanceRoutes.route('/add').post(function(req, res) {
    let ambulance = new Ambulance(req.body);
    ambulance.save()
    .then(ambulance => {
        res.status(200).json({'ambulance': 'ambulance added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new ambulance failed');
    });
});

ambulanceRoutes.route('/:id').delete(function(req, res) {
    Ambulance.findById(req.params.id)
    .then(ambulance => ambulance.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false}));
});

app.use('/ward', wardRoutes);
app.use('/ambulance', ambulanceRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});