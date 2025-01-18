import { cache } from 'react';

export const Getcategories = cache(async () => {
try {

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-categories`
    ,{next:{revalidate:100}}
  );
  const data = await res.json();
  return data;
}
catch(err) {
  console.log('err: ', err);

}
});