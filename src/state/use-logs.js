import { useEffect, useRef, useState } from 'react';
import { useGet } from './use-get';
import { makeLog } from '../data-types/logs';

const buildEndpoint = (groupName, taskName) =>
  [
    '/api/v1/logs',
    ...[groupName ? groupName : null],
    ...[groupName && taskName ? taskName : null],
  ]
    .filter($ => $ !== null)
    .join('/');

export const useLogs = ({ groupName, taskName, limit = 20, poll = 0 } = {}) => {
  const endpoint = buildEndpoint(groupName, taskName);
  const [info, { buildUrl, fetch }] = useGet(endpoint, { lazy: true });
  const cursorNew = useRef(null);
  const cursorMore = useRef(null);
  const logs = useRef([]);
  const pollTimerRef = useRef(null);
  const [, setUpdate] = useState(0);

  // Update the cursors values
  useEffect(() => {
    (() => {
      const { data } = info;
      if (!data) return;

      const cursors = data.logs.map($ => $.cursor);
      cursors.sort((a, b) => b - a);

      // Update the cursor used to retrieve new data
      if (cursorNew.current === null || cursorNew.current < cursors[0]) {
        cursorNew.current = cursors[0];
      }

      // Update the cursor used to retrieve older pages
      if (
        cursorMore.current === null ||
        cursorMore.current > cursors[cursors.length - 1]
      ) {
        cursorMore.current = cursors[cursors.length - 1];
      }
    })();
  }, [info.data]);

  // Merge new data into the current available items
  useEffect(() => {
    (() => {
      if (!info.data) return;

      // Isolate new logs and return in case there are none
      const newLogsFn = log => logs.current.includes(log) === false;
      const newLogs = info.data.logs.filter(newLogsFn).map(makeLog);
      if (!newLogs.length) return;

      logs.current = [...logs.current, ...newLogs];
      logs.current.sort((a, b) => b.cursor - a.cursor);
      setUpdate(v => v + 1);
    })();
  }, [info.data]);

  const fetchNewItems = () => {
    if (!cursorNew.current) return;

    const url = cursorNew.current
      ? buildUrl({ cursor: cursorNew.current, reverse: true })
      : buildUrl({ limit });
    fetch({}, url);
  };

  const fetchNextPage = () => {
    if (!cursorNew.current) return;
    const url = buildUrl({ limit, cursor: cursorMore.current });
    fetch({}, url);
  };

  // Polling for new items
  useEffect(() => {
    if (poll > 0) {
      pollTimerRef.current = setInterval(() => {
        if (info.isLoading) return;
        fetchNewItems();
      }, poll);
    }

    return () => clearInterval(pollTimerRef.current);
  }, []); // eslint-disable-line

  // Run first data load
  useEffect(() => {
    const url = buildUrl({ limit });
    fetch({}, url);
  }, []); // eslint-disable-line

  return {
    logs: logs.current,
    fetchNewItems,
    fetchNextPage,
  };
};
