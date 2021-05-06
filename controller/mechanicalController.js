const azure = require('azure-storage');
const CAD = require('../models/cad');

module.exports.add_cad = function (req, res) {
    const cad = new CAD();
    CAD.uploadedFile(req, res, async function (err) {
        var blobService = azure.createBlobService();
        var containerName = "cad";
        await blobService.createBlockBlobFromLocalFile(containerName, `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) { 
            if (err)
            res.status(503).render('error', {
                error: true,
                error_code: 503,
                error_message: "The file you uploaded got destroyed in between. Please check your net connection speed or contact us if error still persists"
            });
        });

        var cadUrl = blobService.getUrl(containerName, `${req.file.originalname}`);
        cad.remarks = req.body.remarks;
        cad.iteration = req.body.iteration;
        cad.location = cadUrl;
        cad.posted_by = req.user.user;
        cad.save();
        res.status(302).redirect('back');
    });
};
