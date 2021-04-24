const azure = require('azure-storage');
const Sponsors = require('../models/sponsors');

module.exports.sponsors = function (req, res) {
    Sponsors.find({}, function (err, sponsor) {
        return res.render('sponsors', {
            sponsors: sponsor
        });
    });
};

module.exports.add_sponsor = function (req, res) {
    const sponsor = new Sponsors();
    Sponsors.uploadedLogo(req, res, async function (err) {
        var blobService = azure.createBlobService();
        var containerName = 'sponsors';
        blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) { });

        var logoUrl = blobService.getUrl(containerName, `${req.file.originalname}`);
        sponsor.sponsor = req.body.sponsor_name;
        sponsor.logo = logoUrl;
        sponsor.save();
        res.redirect('back');
    });
};
