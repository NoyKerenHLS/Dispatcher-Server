import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Article, ArticleData, Filters, Scope, Source } from './articles.model';

const BASE_URL = 'https://newsapi.org/v2/';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectModel('Source') private readonly sourceModel: Model<Source>,
  ) {}

  async fetchAndStore(country: string) {
    const scope = 'top-headlines';
    const filters = `&country=${country}`;

    try {
      const data = await this.get(scope, filters);
      const articles: ArticleData[] = data.articles;

      await articles.map(async (articleData) => {
        const source = await this.findSource(articleData.source.name);

        console.log('source fetched:', source);

        let category = '';
        let language = '';
        if (source) {
          category = source.category;
          language = source.language;
        }

        const newArticle = new this.articleModel({
          country: country,
          source: {
            id: articleData.source.id,
            name: articleData.source.name,
            category: category,
            language: language,
          },
          author: articleData.author,
          title: articleData.title,
          description: articleData.description,
          url: articleData.url,
          urlToImage: articleData.urlToImage,
          publishedAt: articleData.publishedAt,
          content: articleData.content,
        });
        console.log('new article to save', newArticle);
        newArticle.save();
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async findSource(name: string) {
    try {
      const source = await this.sourceModel.findOne({ name: name });
      return source;
    } catch (error) {
      return error;
    }
  }

  async fetchAndStoreSources(country: string) {
    const apiKey = '?apiKey=' + process.env.API_KEY;
    const url =
      BASE_URL + 'top-headlines' + '/sources' + apiKey + '&country=' + country;

    console.log(url);
    try {
      const { data } = await axios.get(url);

      const sources: Source[] = data.sources;

      sources.map((sourceData) => {
        const newSource = new this.sourceModel(sourceData);
        console.log('new source to save:', newSource);
        newSource.save();
      });
    } catch (error) {
      return error;
    }
  }

  async getFromDB(
    scope: string,
    filters: Filters,
    page: number,
    pageSize: number,
  ) {
    let articles: Article[] = [];
    const query = this.getQuery(scope, filters);
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    try {
      const totalResult = (await this.articleModel.find(query)).length;
      const pageCount = totalResult / pageSize;
      articles = await this.articleModel.find(query).limit(limit).skip(skip);
      const articlesData: ArticleData[] =
        this.transformToArticleDataFormat(articles);
      return {
        status: 'ok',
        totalResults: totalResult,
        articles: articlesData,
      };
    } catch (error) {
      return error;
    }
  }

  transformToArticleDataFormat(articles: Article[]) {
    const articlesData: ArticleData[] = [];

    articles.map((article) => {
      const articleData: ArticleData = {
        source: {
          id: article.source.id,
          name: article.source.name,
        },
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
      };
      articlesData.push(articleData);
    });

    return articlesData;
  }

  getQuery(scope: string, filters: Filters) {
    let query: any = {};

    if (filters.sources) {
      query['source.id'] = filters.sources;
      return query;
    }

    if (scope === 'top-headlines') {
      query.country = filters.country;
    }

    if (filters.category) {
      query['source.category'] = filters.category;
    }

    if (filters.language) {
      query['source.language'] = filters.language;
    }

    if (filters.q) {
      query['$or'] = [
        { title: { $regex: filters.q } },
        { description: { $regex: filters.q } },
      ];
    }

    console.log(query);

    return query;
  }

  async get(scope: string, filters: string, page?: number, pageSize?: number) {
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
