"use client";

import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion";
// import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import "react-notion/src/styles.css";
import axios from "axios";

export default function ReactNotion({ pageId }: { pageId: string }) {
  const [response, setResponse] = useState({});

  useEffect(() => {
    axios.get(`https://notion-api.splitbee.io/v1/page/${pageId}`).then(({ data }) => {
      setResponse(data);
    });
  }, []);

  return Object.keys(response).length && <NotionRenderer blockMap={response} fullPage={true} />;
}
