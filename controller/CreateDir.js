const fs = require('fs');

class FileService {
    createDir(file, id){
        const filePath = `${file}\\${id}`;
        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath);
                    return resolve({message: 'File was created'});
                }
            } catch (error) {
                return reject({message: 'File error'});
            }
        })
    }
}

module.exports = new FileService();