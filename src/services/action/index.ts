import { SwipeActionEnum } from '@prisma/client';
import ApiError from 'api/api-error';
import db from 'engine/db/prisma';
import { ActionUpsertPayload } from 'models/interfaces/joi';
import { ExtendedServiceConstructor } from 'models/interfaces/service/service-interface';
import Service from 'services';
import { initPrismaDate } from 'utils';

export default class ActionService extends Service {
  constructor({ prisma = db }: ExtendedServiceConstructor = {}) {
    super({ prisma });
  }

  async checkUserMatch({ user1, user2 }: { user1: string; user2: string }) {
    if (
      await this.prisma.userAction.count({
        where: {
          AND: [
            {
              fromUserId: user2,
            },
            {
              toUserId: user1,
            },
          ],
          action: SwipeActionEnum.LIKE,
        },
      })
    ) {
      return true;
    }
    return false;
  }

  async upsert({ id, json }: { id: string; json: ActionUpsertPayload }) {
    let action: SwipeActionEnum;

    if (json.swipe === 'LEFT') {
      action = SwipeActionEnum.PASS;
    }

    if (json.swipe === 'RIGHT') {
      action = SwipeActionEnum.LIKE;
    }

    if (json.toUserId === id) {
      throw new ApiError('You cannot swipe yourself', 400);
    }

    let isMatch: boolean = false;

    const existingAction = await this.prisma.userAction.findFirst({
      where: {
        AND: [
          {
            fromUserId: id,
          },
          {
            toUserId: json.toUserId,
          },
        ],
      },
    });

    if (!existingAction) {
      await this.prisma.userAction.create({
        data: {
          fromUserId: id,
          toUserId: json.toUserId,
          action,
        },
      });
    } else {
      await this.prisma.userAction.update({
        where: {
          userActionId: existingAction.userActionId,
        },
        data: {
          fromUserId: id,
          toUserId: json.toUserId,
          action,
        },
      });
    }

    if (action === SwipeActionEnum.LIKE) {
      isMatch = await this.checkUserMatch({
        user1: id,
        user2: json.toUserId,
      });

      if (isMatch) {
        const today = new Date();
        await this.prisma.matchedUser.create({
          data: {
            userId: json.toUserId,
            matcherId: id,
            expiredAt: initPrismaDate(
              new Date(today.setHours(today.getHours() + 24))
            ),
          },
        });
      }
    }

    return {
      isMatch,
      swipedUserId: json.toUserId,
    };
  }
}
