const azure = require('azure-storage');
const Sponsors = require('../models/sponsors');

module.exports.sponsors = function (req, res) {
    Sponsors.find({}, function (err, sponsor) {
        return res.status(200).render('sponsors', {
            sponsors: sponsor
        });
    });
};

module.exports.add_sponsor = function (req, res) {
    const sponsor = new Sponsors();
    Sponsors.uploadedLogo(req, res, async function (err) {
        var blobService = azure.createBlobService();
        var containerName = 'sponsors';
        await blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) {
            if (err)
                res.status(503).render('error', {
                    error: true,
                    error_code: 503,
                    error_message: "The file you uploaded got destroyed in between. Please check your net connection speed or contact us if error still persists"
                });
        });

        var logoUrl = blobService.getUrl(containerName, `${req.file.originalname}`);
        sponsor.sponsor = req.body.sponsor_name;
        sponsor.logo = logoUrl;
        sponsor.save();
        res.status(302).redirect('back');
    });
};

module.exports.remove_sponsor = function (req, res) {
    const parsed_url = req.url.split("/");
    Sponsors.findByIdAndDelete(parsed_url[2], function (err, user) {
        if (err)
            res.status(503).render('error');
        else
            res.status(302).redirect('back');
    });
};
