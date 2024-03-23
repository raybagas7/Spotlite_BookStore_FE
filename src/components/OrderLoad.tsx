import { fetchOrders } from '@/actions/fetch-orders';
import { delay } from '@/lib/utils';
import { useUser } from '@/store/useUser';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './ui/spinner';
import Orders from './Orders';

interface IOrderLoad {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderLoad = ({ orders, setOrders }: IOrderLoad) => {
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [keepLoad, setKeepload] = useState(true);
  const [preventLoad, setPreventLoad] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    const loadMoreOrders = async () => {
      await delay(2000);
      const nextPage = pagesLoaded + 1;
      const newBooks = (await fetchOrders(nextPage, 12)) ?? [];

      setOrders((prev: Order[]) => [...prev, ...newBooks]);
      setPagesLoaded(nextPage);
      if (newBooks.length === 0) {
        setKeepload(false);
      }
      setPreventLoad(false);
    };
    if (inView) {
      if (!preventLoad) {
        setPreventLoad(true);
        loadMoreOrders();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <Orders orders={orders} setOrders={setOrders} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-4"
        ref={ref}
      >
        {keepLoad && <Spinner />}
      </div>
    </>
  );
};

export default OrderLoad;
