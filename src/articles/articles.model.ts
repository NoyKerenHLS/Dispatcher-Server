import exp from 'constants';
import * as mongoose from 'mongoose';

export const articleSchema = new mongoose.Schema({
  country: { type: String },
  source: {
    id: { type: String },
    name: { type: String },
    category: { type: String },
    language: { type: String },
  },
  author: { type: String },
  title: { type: String },
  description: { type: String },
  url: { type: String },
  urlToImage: { type: String },
  publishedAt: { type: String },
  content: { type: String },
});

export const sourceSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  description: { type: String },
  url: { type: String },
  category: { type: String },
  language: { type: String },
  country: { type: String },
});

export interface Article {
  country: string;
  source: {
    id: string;
    name: string;
    category: string;
    language: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ArticleData {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Filters {
  country: string;
  category: string;
  sources: string;
  q: string;
  from: string;
  to: string;
  language: string;
  sortBy: string;
}

export type Scope = 'top-headlines' | 'everything';
