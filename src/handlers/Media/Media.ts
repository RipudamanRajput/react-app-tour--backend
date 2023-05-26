import path from "path";
import fs from 'fs'

export function getallimages(req, res) {
    try {
        const directoryPath = path.join(__dirname, '../../Uploadmedia');
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                res.json({ message: 'Unable to scan directory: ' + err, result: false })
            }
            let ar = [];
            files.forEach(function (file) {
                ar.push({
                    src: `${process.env.PORT}/images/${file}`,
                    name: file
                })
            });
            res.json({ data: ar })
        });

    } catch (error) {
        res.json({ error, acknowledge: false })
    }
}

export function deletefile(req, res) {
    const id = req.params.id;
    const directoryPath = path.join(__dirname, `../../Uploadmedia/${id}`);
    fs.unlink(directoryPath, (err) => {
        if (err) {
            res.json({ message: `No file fount by ${id} this name to delete`, result: false })
        }else{
            res.json({ message: 'Delete File successfully',result: true })
        }
    });
}