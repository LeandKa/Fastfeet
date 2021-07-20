import File from '../models/Files';

class FileController {
  async create(req, res) {
    const file = req.file;
    const files = await await File.create({
        name:file.originalname,
        path:file.filename,
      });
    return res.status(202).json({ files });
  }
};


export default new FileController();
