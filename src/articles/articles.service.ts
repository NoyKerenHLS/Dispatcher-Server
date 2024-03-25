import { Injectable } from '@nestjs/common';
import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2/';

@Injectable()
export class ArticlesService {
  async get(scope: string, filters: string, page: number, pageSize: number) {
    const pages = `&page=${page}&pageSize=${pageSize}`;
    const endPoint = BASE_URL + scope;
    const apiKey = '?apiKey=' + process.env.API_KEY;

    const url = endPoint + apiKey + filters + pages;

    console.log(url);

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getSources() {
    const apiKey = '?apiKey=' + process.env.API_KEY;
    const url = BASE_URL + 'top-headlines' + '/sources' + apiKey;

    console.log(url);
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return error;
    }
  }
}
