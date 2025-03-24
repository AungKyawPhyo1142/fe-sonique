import { apiClient } from "../apiClient";
import { ApiConstantRoutes } from "../path";
import { STATUS } from "./auth";

export interface SongResponse{
    data:{
       songs:[
        {
            artistId: string;
            audioUrl: string;
            coverImageUrl: string;
            duration: number;
            genre: string;
            id: string;
            title: string;
        }
       ],
       nextCursor: string;
       hasMore: boolean;
    }
    status: STATUS;
}

export const getAllSongs ={
    async getAllSongs(cursor?: string): Promise<SongResponse>{
        return apiClient.get(ApiConstantRoutes.paths.auth.getAllSongs(cursor));
    }
}