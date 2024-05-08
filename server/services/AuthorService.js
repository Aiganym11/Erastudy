import models from "../models/index.js";

class AuthorService {
  async getAll(page = 1, limit = 10, search = '') {
    try {
      const query = {};
      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: 'i' } }, 
          { lastName: { $regex: search, $options: 'i' } } 
        ];
      }

      const authors = await models.Author.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await models.Author.countDocuments(query);

      return {
        status: 200,
        data: {
          authors,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          totalAuthors: total
        }
      };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e.message };
    }
  }
}

export default new AuthorService();
