import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import PostCreatePage from './pages/PostCreatePage';
import PostDetailPage from './pages/PostDetailPage';
import PostListPage from './pages/PostListPage';

// 一番下のルーティングはURLが用意したpathのどれにも一致しなかった場合に、
// 自動的に投稿一覧画面に移動するように設定したもの
const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/posts/new" element={<PostCreatePage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
    </Route>
    
    <Route path="*" element={<Navigate to="/posts" replace />} />
  </Routes>
);

export default App;