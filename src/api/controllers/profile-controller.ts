import type { Express } from 'express';
import defaultFs from 'fs';
import ProfileService from 'services/profile';
import Controller from '.';
import { RequestHandler } from 'express';
import {
  ProfileUpdatePreferenceSchema,
  ProfileUpdateSchema,
} from 'models/schemas/joi/profile-joi';
import ApiError from 'api/api-error';

export default class ProfileController extends Controller<ProfileService> {
  readonly fs: typeof defaultFs;

  constructor(
    service: ProfileService = new ProfileService(),
    fs: typeof defaultFs = defaultFs
  ) {
    super({ service });
    this.fs = fs;
  }

  update(): RequestHandler {
    return async (req, res) => {
      const { value } = this.validateRequest(ProfileUpdateSchema, req.body);

      const data = await this.service.update({
        id: res.locals.user.userId as string,
        json: value,
      });

      res.locals.response.setResults({
        data,
      });
    };
  }

  updatePhoto(): RequestHandler {
    return async (req, res) => {
      if (!req.files.length) {
        throw new ApiError('Require at least 1 photo', 400);
      }

      const photos = await this.service.processImages({
        folder: res.locals.user.userId as string,
        images: req.files as Express.Multer.File[],
      });

      if (
        await this.service.updatePhoto({
          id: res.locals.user.userId as string,
          photos,
        })
      ) {
        res.locals.response.setResults({
          data: {
            success: true,
          },
        });
      }
    };
  }

  getPhoto(): RequestHandler {
    return async (req, res) => {
      const imagePaths = `public/images/${req.params.userId}/${req.params.path}`;

      if (!this.fs.existsSync(imagePaths)) {
        throw new ApiError('File not found', 400);
      }

      res.locals.response.setResults({
        data: imagePaths,
        isFile: true,
      });
    };
  }

  getRandomProfile(): RequestHandler {
    return async (req, res) => {
      const cacheKey = `swiped-profile_${res.locals.user.userId as string}`;

      const cachedData = await res.locals.modules.cache.pull(cacheKey);

      const data = await this.service.getRandomProfile({
        id: res.locals.user.userId as string,
        exclude: JSON.parse(cachedData || '[]'),
      });

      res.locals.response.setResults({
        data,
      });
    };
  }

  updatePreference(): RequestHandler {
    return async (req, res) => {
      const { value } = this.validateRequest(
        ProfileUpdatePreferenceSchema,
        req.body
      );

      if (
        await this.service.updatePreference({
          id: res.locals.user.userId as string,
          json: value,
        })
      ) {
        res.locals.response.setResults({
          data: {
            success: true,
          },
        });
      }
    };
  }

  listMatchedProfile(): RequestHandler {
    return async (req, res) => {
      const data = this.service.getMatchedProfile({
        id: res.locals.user.userId,
      });

      res.locals.response.setResults({
        data,
      });
    };
  }
}
