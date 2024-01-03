import {Nullable, PaginatedResponse, Pagination} from "@/util";
import {ApiError} from "@/domain/errors/FHLApiError";

export interface Award {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    seasonId: string;
    winningUserIds: string[];
    presentingUserIds: string[];
}

export class AwardsList extends PaginatedResponse<Award> {
  constructor(paginationParams: Pagination, total: number, data: Award[]) {
    super(paginationParams, total, data);
  }
}

export type AwardsResponse = AwardsList | ApiError;
export type AwardResponse = Award | ApiError;

export interface CreateAwardParams {
    name: string;
    seasonId: string;
    winningUserIds?: string[];
    presentingUserIds?: string[];
}
