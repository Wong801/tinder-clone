import {
  IApiResponse,
  Metadata,
} from 'models/interfaces/api/api-response-interface';
import ApiError from './api-error';
import { Response } from 'express';

export default class ApiResponse implements IApiResponse {
  public status: number;
  public metadata: Metadata;
  public results: unknown;
  public isFile: boolean;

  constructor() {
    this.status = 200;
    this.metadata = {
      error: null,
    };
    this.results = null;
    this.isFile = false;
  }

  setResults({
    data = null,
    error = null,
    status = 200,
    isFile = false,
  }: {
    data?: unknown | null;
    error?: ApiError | null;
    status?: number;
    isFile?: boolean;
  }) {
    this.results = data;
    this.metadata.error = error;
    this.isFile = isFile;
    if (status) this.status = status;
  }

  setErrorResults({ data, status }: { data: ApiError; status: number }) {
    this.metadata.error = data;
    this.status = status;
  }

  json() {
    if (this.metadata.error) {
      if (this.metadata.error instanceof ApiError) {
        this.metadata.error = (this.metadata.error as ApiError).json();
      } else {
        this.metadata.error = new ApiError(this.metadata.error.message).json();
      }
    }
    return {
      metadata: this.metadata,
      results: this.results,
    };
  }

  send(res: Response) {
    if (this.isFile) {
      return res.status(this.status).sendFile(this.results as string, {
        root: process.cwd(),
        dotfiles: 'deny',
      });
    }
    return res.status(this.status).json(this.json());
  }
}
