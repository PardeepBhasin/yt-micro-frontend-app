import React, { Suspense } from 'react';

const HeaderApp = React.lazy(() => import('shared_header/HeaderApp'));

export default function App() {
  return (
    <div>
      <h1>App (HOST App Shell)</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <HeaderApp />
      </Suspense>
    </div>
  );
}
