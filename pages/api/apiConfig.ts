/**
 * fetch API
 * @param method
 * @param apiUrl
 * @param data
 */

type MethodType = "POST" | "GET" | "UPDATE" | "DELETE";

const fetchApi = async (method: MethodType, apiUrl: string, data: any) => {
  const result = await fetch(apiUrl, {
    method: method,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      console.log("요청 성공");
    } else {
      console.log("요청 실패");
    }

    return response;
  });

  return result;
};

export default fetchApi;
