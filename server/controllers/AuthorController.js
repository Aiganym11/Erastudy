import AuthorService from "../services/AuthorService.js";

class AuthorController {
  async getAll(req, res) {
    const { page, limit, search } = req.query;
    const response = await AuthorService.getAll(page, limit, search);
    return res.status(response.status).json(response);
  }

}

export default new AuthorController();
