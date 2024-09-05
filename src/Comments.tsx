/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect } from 'react';
import { useData } from './data';

export default function Comments() {
  const comments = useData();
  useEffect(() => {
    console.log('ssss');
  }, []);
  return (
    <>
      {comments.map((comment, i) => (
        <p className='comment' key={i}>
          {comment}
        </p>
      ))}
    </>
  );
}
