import { Injectable } from '@nestjs/common';
import axios from 'axios';

const END_POINT = 'https://newsapi.org/v2/everything';
const API_KRY = '?apiKey=1ab54f6161084c749f2dcd1a00f84f22';
const PAGE_SIZE = '20';

@Injectable()
export class EverythingService {
  async getArticles(filters: string, page: number) {
    const pages = `&page=${page}&pageSize=${PAGE_SIZE}`;

    const url = END_POINT + API_KRY + filters + pages;

    console.log(url);

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
