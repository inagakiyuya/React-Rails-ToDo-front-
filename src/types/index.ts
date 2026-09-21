// Userモデル
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Postモデル
export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

// ログイン・会員登録成功時にRailsから返ってくるデータの構造
export interface AuthResponse {
  token: string | null;
  exp: string;
  email: string;
}

// ログイン時のUserを作成する時の入力データの型
export interface LoginInput {
  email: string;
  password: string;
}

// Postを作成する時の入力データの型
export interface CreatePostInput {
  title: string;
  content: string;
}

// Postを更新する時の入力データの型
// （変更したい箇所だけ送れるように全て任意にしています）
export interface UpdatePostInput {
  title?: string;
  content?: string;
}