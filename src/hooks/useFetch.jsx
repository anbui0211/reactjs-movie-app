import { useEffect, useState } from "react";

const DEFAULT_HEADER = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
};

/**
 * enable: quyết định khi nào mới thực hiện việc gọi API
 */
export default function useFetch(
  { url = "", method = "GET", headers = {} },
  { enabled } = { enabled: true },
) {
  const [data, setData] = useState({});
  const [isLoadding, setIsLoading] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);

      fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
        method: method,
        headers: {
          ...DEFAULT_HEADER,
          ...headers,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          setData(data);
          // console.log({ data });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // Back to top
    // window.scrollTo({ top: 0, behavior: "smooth" });

    /** Giải thích tại sao lại sử dụng JSON.stringify trong useEffect này?
     *  Mỗi khi Use effect này được thực thi lại,
     * thì nó sẽ tạo cho chúng ta 1 object "headers" mới ở 1 địa chỉ mới,
     * nên khi nó tham chiếu ở 2 lần function này được gọi,
     * nó đã tham chiếu đến 2 địa chỉ vùng nhớ khác nhau (mặc dù cùng giống nhau về value)
     * => nó sẽ gặp lỗi infinite loop (gọi effect liên tục vì headers)
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers)]);

  return {
    data,
    isLoadding,
  };
}
