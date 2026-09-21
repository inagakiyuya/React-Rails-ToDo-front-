import axiosInstance from "./axios";
import type { CreatePostInput, Post, UpdatePostInput } from "../types";

// posts#index
export const getPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get<Post[]>(`/api/v1/posts`);
  return response.data;
};

// posts#show
export const getPost = async (id: string): Promise<Post> => {
  const response = await axiosInstance.get<Post>(`/api/v1/posts/${id}`);
  return response.data;
};

// posts#create
export const createPost = async (input: CreatePostInput): Promise<Post> => {
  const response = await axiosInstance.post<Post>(`/api/v1/posts`, {
    post: input,
  });
  return response.data;
};

// posts#update
export const updatePost = async (id: string, input: UpdatePostInput): Promise<Post> => {
  const response = await axiosInstance.patch<Post>(`/api/v1/posts/${id}`, {
    post: input,
  });
  return response.data;
}

// posts#delete
export const deletePost = async (id: string): Promise<void> => {
  await axiosInstance.delete<Post>(`/api/v1/posts/${id}`);
};
