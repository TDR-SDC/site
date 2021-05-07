const azure = require('azure-storage');
const Photos = require('../models/photo');
const Newsletter = require('../models/newsletter');

module.exports.add_photo = function (req, res) {
    const photo = new Photos();
    Photos.uploadedPhoto(req, res, async function (err) {
        console.log(req.file);
        var blobService = azure.createBlobService();
        var containerName = 'gallery';
        await blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) {
            if (err)
                res.status(503).render('error', {
                    error: true,
                    error_code: 503,
                    error_message: "The file you uploaded got destroyed in between. Please check your net connection speed or contact us if error still persists"
                });
        });

        var photoUrl = blobService.getUrl(containerName, `${req.file.originalname}`);
        photo.descript = req.body.descript;
        photo.photo = photoUrl;
        photo.save();
        res.status(200).redirect('back');
    });
};

module.exports.add_newsletter = function (req, res) {
    const newsletter = new Newsletter();
    Newsletter.uploadedNewsletter(req, res, async function (err) {
        var blobService = azure.createBlobService();
        var containerName = 'newsletters';
        await blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) {
            if (err)
                res.status(503).render('error', {
                    error: true,
                    error_code: 503,
                    error_message: "The file you uploaded got destroyed in between. Please check your net connection speed or contact us if error still persists"
                });
        });

        var Url = blobService.getUrl(containerName, `${req.file.originalname}`);
        newsletter.date = req.body.date;
        newsletter.link = Url;
        newsletter.uploadedBy = req.user.user;
        newsletter.save();
        res.status(200).redirect('back');
    });
};
