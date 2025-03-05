import { ProfileFormValues } from "@/pages/user/Profile"
import { apiClient } from "../apiClient"
import { ApiConstantRoutes } from "../path"
import { STATUS } from "./auth"
export interface ToggleArtistValue{
    id: string,
}
export interface UploadImageValue{
    id: string,
    image: File
}
export interface UploadImageResponse {
    data: {
        bio: string,
        email: string,
        firstName: string,
        id: string,
        lastName: string,
        profileImage: string,
        username: string,

    }
    status: STATUS
}

export interface ToggleArtistResponse {
    data:{
    id: string,
    isArtist: boolean,
    message: string
    }
    status: STATUS
}

export interface UpdateUserRespose{
    data:{
    bio: string,
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    }
    status: STATUS
}

export const userUpdateRequest = {
    async updateUser(v:ProfileFormValues): Promise<UpdateUserRespose>{
        return apiClient.patch(ApiConstantRoutes.paths.auth.updateUser(v.id!), v)
    },
    async upLoadImage(v:UploadImageValue): Promise<UploadImageResponse>{
        return apiClient.patch(ApiConstantRoutes.paths.auth.updateUser(v.id!), v)
    }

}

export const toggleArtistRequest = {
    async activateArtist(v:ToggleArtistValue): Promise<ToggleArtistResponse>{
        return apiClient.patch(ApiConstantRoutes.paths.auth.activateArtist(v.id!), v)
    },
    async deactivateArtist(v:ToggleArtistValue): Promise<ToggleArtistResponse>{
        return apiClient.patch(ApiConstantRoutes.paths.auth.deactivateArtist(v.id!), v)
    },
}