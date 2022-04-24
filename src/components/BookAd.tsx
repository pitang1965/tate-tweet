import type { FC } from 'react';

type BookAdProps = {
  code: string;
};

const BookAd: FC<BookAdProps> = ({ code }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: code,
    }}
  ></div>
);

export default BookAd;
