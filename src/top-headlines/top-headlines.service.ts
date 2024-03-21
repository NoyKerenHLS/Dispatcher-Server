import { Injectable } from '@nestjs/common';
import axios from 'axios';

const END_POINT = 'https://newsapi.org/v2/top-headlines';
const PAGE_SIZE = '20';

@Injectable()
export class TopHeadlinesService {
  async getArticles(filters: string, page: number) {
    const pages = `&page=${page}&pageSize=${PAGE_SIZE}`;
    const apiKey = '?apiKey=' + process.env.API_KEY;

    const url = END_POINT + apiKey + filters + pages;

    console.log(url);

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getSources() {
    const url = END_POINT + '/sources' + process.env.API_KRY;
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return error;
    }
  }
}
