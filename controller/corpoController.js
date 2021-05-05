const azure = require('azure-storage');
const Photos = require('../models/photo');

module.exports.add_photo = function (req, res) {
    const photo = new Photos();
    Photos.uploadedPhoto(req, res, async function (err) {
        console.log(req.file);
        var blobService = azure.createBlobService();
        var containerName = 'gallery';
        blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) { });

        var photoUrl = blobService.getUrl(containerName, `${req.file.originalname}`);
        photo.descript = req.body.descript;
        photo.photo = photoUrl;
        photo.save();
        res.redirect('back');
    });
};
