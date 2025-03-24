import { apiClient } from "../apiClient";
import { ApiConstantRoutes } from "../path";
import { Artist } from "./artist";
import { STATUS } from "./auth";

export interface SongResponse{
    data:{
       songs:[
        {
            artist: Artist;
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

export interface SongDetailResponse{
    data:{
        artist: Artist;
        audioURL: string;
        coverImageURL: string;
        duration: number;
        genre: {
            id: string;
            name: string;
        },
        id: string;
        title: string;

    }
    status: STATUS; 
}

export const getAllSongs ={
    async getAllSongs(cursor?: string): Promise<SongResponse>{
        return apiClient.get(ApiConstantRoutes.paths.auth.getAllSongs(cursor));
    }
}

export const getSongDetail ={
    async getSongDetail(id?: string): Promise<SongDetailResponse>{
        return apiClient.get(ApiConstantRoutes.paths.auth.getSongDetail(id));
    }
}