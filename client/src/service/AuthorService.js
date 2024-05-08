import { $host, $authHost } from "./index";

class AuthorService {

  async getAuthors(page = 1, limit = 10, search) {
    try {
      const req = await $host.get("authors", {
        params: {
          page,
          limit,
          search
        },
      });
      return req.data;
    } catch (e) {
      return null;
    }
  }

}

export default new AuthorService();
