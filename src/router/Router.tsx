import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Recordings } from '../pages/Recordings';
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Script } from '../pages/Script';
import { Languages } from '../pages/Languages';
import { Deliveres } from '../pages/Deliveres';
import { TestPlayer } from '../pages/TestPlayer';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { LineDetails } from '../pages/LineDetails';
import { Upload } from '../pages/Upload';
import { ProjectDetails } from '../pages/ProjectDetails';
import { Workspace } from '../pages/Workspace';

const Router:React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <Routes>
      {!authContext?.isLoggedIn && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/login2" element={<Workspace />} />
        </>
      )}
      {authContext?.isLoggedIn && (
      <>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/script" element={<Script />} />
        <Route path="/lines/:id" element={<LineDetails />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/deliveres" element={<Deliveres />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/recordings" element={<Recordings />} />
        <Route path="/test-audio-player" element={<TestPlayer />} />
      </>
      )}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<div>Page Not Found</div>} />
    </Routes>
  );
};
export default Router;
