const express = require('express');

const router = express.Router();
const Actuality = require('../models/actuality');

const multer = require('multer');

filename = '';
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {

        let date = Date.now();
        filename = date + '.' + file.mimetype.split('/')[1]; // Assign the file name to 'filename'
        redirect(null, filename);
    }
})

const upload = multer({ storage: mystorage });

//Actuality crud
router.post('/createActuality', upload.any('image'), async (req, res) => {
    try {
        data = req.body;
        act = new Actuality(data);

        act.image = filename;
        savedAct = await act.save();
        filename = '';
        res.status(200).send(savedAct);

    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/getAllActualities', async (req, res) => {
    try {
        const actualities = await Actuality.find()
            .populate('author', 'username')
            .exec();

        // Ajouter l'URL complète de l'image en utilisant '/getimage'
        actualities.forEach((actuality) => {
            actuality.image = `http://localhost:3000/getimage/${actuality.image}`;
        });

        res.status(200).send(actualities);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching actualities', error: err });
    }
});



// router.get('/getAllActualities', async (req, res) => {
//     try {
//         const actualities = await Actuality.find().populate('author', 'username'); // Inclure le nom d'utilisateur
//         res.status(200).send(actualities);
//     } catch (err) {
//         res.status(500).send({ error: 'Failed to fetch actualities' });
//     }
// });

router.delete('/delete/:id', async (req, res) => {
    try {
        myid = req.params.id;
        deletedActuality = await Actuality.findOneAndDelete({ _id: myid })
        res.status(200).send(deletedActuality);
    } catch (err) {
        res.status(400).send(err);
    }
})
/*
router.put('/updateActuality/:id', async (req, res) => {
    try {
        id = req.params.id;
        newData = req.body;
        updated = await Actuality.findByIdAndUpdate({ _id: id });
        res.status(200).send(updated)
    } catch (err) {
        res.status(400).send(err);
    }
});

*/
router.put('/updateActuality/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;  // Récupère l'ID de l'actualité à mettre à jour
        const newData = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            image: req.file ? req.file.path : req.body.image  // Si une image est envoyée, on prend son chemin
        };

        // Mise à jour de l'actualité dans la base de données
        const updated = await Actuality.findByIdAndUpdate(id, newData, { new: true });

        if (!updated) {
            return res.status(404).send({ message: 'Actuality not found' });
        }

        // Retourne la réponse avec l'actualité mise à jour
        res.status(200).send({ message: 'Updated successfully', data: updated });
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;