/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Suspense, lazy, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Html from './Html';
import Spinner from './Spinner';
import Layout from './Layout';
import NavBar from './NavBar';

const Comments = lazy(() => import('./Comments'));
const Sidebar = lazy(() => import('./Sidebar'));
const Post = lazy(() => import('./Post'));

export default function App({ assets }: any) {
  return (
    <Html assets={assets} title='Hello'>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </Html>
  );
}

function Content() {
  return (
    <Layout>
      <NavBar />
      <aside className='sidebar'>
        <Suspense fallback={<Spinner />}>
          <Sidebar />
        </Suspense>
      </aside>
      <article className='post'>
        <Suspense fallback={<Spinner />}>
          <Post />
        </Suspense>
        <section className='comments'>
          <h2>Comments</h2>
          <Suspense fallback={<Spinner />}>
            <Comments />
          </Suspense>
        </section>
        <h2>Thanks for reading!</h2>
      </article>
    </Layout>
  );
}

function Error({ error }: any) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  );
}
