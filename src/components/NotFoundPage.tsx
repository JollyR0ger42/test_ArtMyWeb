import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/students">go to /students</a>
    </div>
  );
};

export default NotFoundPage;
